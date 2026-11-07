import { useState, useEffect } from "react";
import { MessageCircle, Send, AlertCircle, Loader2 } from "lucide-react";
import { services } from "../data/services";
import businessInfo, { mailLink, waLink } from "../data/business";
import { submitEnquiry } from "../lib/enquiries";
import { isSupabaseConfigured } from "../lib/supabaseClient";

const emptyForm = { name: "", phone: "", email: "", service: "", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QuoteForm({ presetService, onConsumePreset }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill the service dropdown when arriving from a service detail's
  // "Get a Quote" button.
  useEffect(() => {
    if (presetService) {
      setForm((f) => ({ ...f, service: presetService }));
      onConsumePreset?.();
    }
  }, [presetService]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number.";
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!form.service) next.service = "Please select a service.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ── How this connects to a backend ──
  // If Supabase is configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
  // set — see README), submissions are saved directly to the `enquiries`
  // table and appear immediately in /admin/enquiries. If Supabase isn't
  // configured yet, this falls back to opening the visitor's email app
  // pre-filled with their enquiry, so the form still works today.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return; // guards against double-submit
    if (!validate()) return;

    if (!isSupabaseConfigured) {
      const body = [
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `Service Required: ${form.service}`,
        "",
        form.message,
      ].join("\n");
      window.location.href = `${mailLink(`Website Enquiry — ${form.service}`)}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    const { error } = await submitEnquiry(form);

    if (error) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending your enquiry. Please try again, or contact us directly on WhatsApp or by phone."
      );
      return;
    }
    setStatus("success");
  };

  const whatsappFallback = () => {
    const text = `Hello Hussaini Glass, my name is ${form.name || "___"}. I'm interested in ${form.service || "your services"}. ${form.message}`.trim();
    return waLink(text);
  };

  return (
    <section id="quote" className="bg-navy text-paper scroll-mt-16">
      <div className="container-content py-20 lg:py-28">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16">
          <div>
            <p className="eyebrow text-steel-light mb-3 font-medium">Get a quote</p>
            <h2 className="text-[32px] sm:text-[38px] leading-[1.15] text-white">
              Tell us what you need
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-paper/70 max-w-sm">
              Share your requirement below and we'll get in touch — or skip
              the form and contact Hussaini Glass directly on WhatsApp.
            </p>
            <a
              href={waLink("Hello Hussaini Glass, I'd like to share my requirement and get a quote.")}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-7 !text-[15.5px]"
            >
              <MessageCircle size={17} strokeWidth={1.75} />
              WhatsApp Us Instead
            </a>
          </div>

          <form onSubmit={handleSubmit} noValidate className="border border-white/10 bg-paper text-ink p-6 sm:p-9">
            {status === "success" ? (
              <div className="py-10 text-center">
                <h3 className="text-[20px] font-display">Thank you</h3>
                <p className="mt-2 text-[14.5px] text-ink/60">
                  {isSupabaseConfigured
                    ? "Your enquiry has been received. We'll get in touch with you shortly."
                    : "Your email app should have opened with your enquiry ready to send."}
                </p>
                <a href={whatsappFallback()} target="_blank" rel="noreferrer" className="btn-primary mt-5">
                  <MessageCircle size={17} strokeWidth={1.75} />
                  Also send on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => { setForm(emptyForm); setErrors({}); setStatus("idle"); }}
                  className="block mx-auto mt-4 text-[13px] text-ink/50 underline underline-offset-4"
                >
                  Fill another enquiry
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {!isSupabaseConfigured && (
                  <div className="sm:col-span-2 flex gap-2.5 bg-amber-50 border border-amber-200 text-amber-800 text-[12.5px] px-3.5 py-2.5">
                    <AlertCircle size={15} strokeWidth={1.75} className="shrink-0 mt-0.5" />
                    <span>
                      Direct database submission isn't connected yet — sending
                      this will open your email app instead. See README for
                      Supabase setup.
                    </span>
                  </div>
                )}
                {status === "error" && (
                  <div className="sm:col-span-2 flex gap-2.5 bg-red-50 border border-red-200 text-red-700 text-[12.5px] px-3.5 py-2.5">
                    <AlertCircle size={15} strokeWidth={1.75} className="shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <Field label="Name" required error={errors.name}>
                  <input value={form.name} onChange={update("name")} className="input" placeholder="Your full name" />
                </Field>
                <Field label="Phone Number" required error={errors.phone}>
                  <input type="tel" value={form.phone} onChange={update("phone")} className="input" placeholder="10-digit mobile number" />
                </Field>
                <Field label="Email" className="sm:col-span-2" error={errors.email}>
                  <input type="email" value={form.email} onChange={update("email")} className="input" placeholder="you@example.com" />
                </Field>
                <Field label="Service Required" required className="sm:col-span-2" error={errors.service}>
                  <select value={form.service} onChange={update("service")} className="input">
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" className="sm:col-span-2">
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    className="input resize-none"
                    placeholder="Tell us about your space and requirement"
                  />
                </Field>

                <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-1">
                  <button type="submit" disabled={status === "submitting"} className="btn-dark disabled:opacity-50">
                    {status === "submitting" ? (
                      <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />
                    ) : (
                      <Send size={16} strokeWidth={1.75} />
                    )}
                    {status === "submitting" ? "Sending…" : "Send Enquiry"}
                  </button>
                  <span className="text-[12.5px] text-ink/45">
                    Or reach us directly at {businessInfo.phone}
                  </span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, required, className = "", error }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[12.5px] text-ink/60 mb-1.5">
        {label} {required && <span className="text-steel">*</span>}
      </span>
      {children}
      {error && <span className="block text-[12px] text-red-600 mt-1">{error}</span>}
    </label>
  );
}
