import { useEffect, useMemo, useState } from "react";
import { Search, Phone, Mail, MessageCircle, Trash2, AlertCircle, X } from "lucide-react";
import { fetchEnquiries, updateEnquiryStatus, deleteEnquiry } from "../../lib/enquiries";
import { services } from "../../data/services";
import { waLink } from "../../data/business";
import { StatusPill } from "./Dashboard";

const STATUSES = ["New", "Contacted", "Completed"];

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await fetchEnquiries();
    if (error) setError("Couldn't load enquiries from Supabase.");
    else setError("");
    setEnquiries(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      if (serviceFilter && e.service !== serviceFilter) return false;
      if (statusFilter && e.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${e.name} ${e.phone} ${e.email || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [enquiries, search, serviceFilter, statusFilter]);

  const handleStatusChange = async (id, status) => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    const { error } = await updateEnquiryStatus(id, status);
    if (error) {
      setError("Couldn't update status — please retry.");
      load();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await deleteEnquiry(id);
    if (error) {
      setError("Couldn't delete this enquiry — please retry.");
    } else {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      setSelected(null);
    }
    setConfirmDelete(null);
  };

  return (
    <div>
      <h1 className="text-[24px] font-display">Enquiries</h1>
      <p className="mt-1 text-[14px] text-ink/55">Every quote request submitted through the website.</p>

      {error && (
        <div className="mt-5 flex gap-2.5 bg-red-50 border border-red-200 text-red-700 text-[13px] px-4 py-3">
          <AlertCircle size={16} strokeWidth={1.75} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone or email"
            aria-label="Search enquiries"
            className="input !pl-9"
          />
        </div>
        <select value={serviceFilter} onChange={(e) => setServiceFilter(e.target.value)} aria-label="Filter by service" className="input !w-auto">
          <option value="">All services</option>
          {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status" className="input !w-auto">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-5 bg-white border border-line overflow-x-auto">
        {loading ? (
          <p className="px-5 py-10 text-center text-[13.5px] text-ink/45">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="px-5 py-10 text-center text-[13.5px] text-ink/45">
            {enquiries.length === 0
              ? "No enquiries yet — they'll appear here as soon as someone submits the quote form."
              : "No enquiries match these filters."}
          </p>
        ) : (
          <table className="w-full text-[13.5px] min-w-[720px]">
            <thead>
              <tr className="border-b border-line text-left text-[12px] text-ink/45">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((e) => (
                <tr key={e.id} className="hover:bg-mist/50 cursor-pointer" onClick={() => setSelected(e)}>
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3 text-ink/60">{e.phone}</td>
                  <td className="px-4 py-3 text-ink/60">{e.service || "—"}</td>
                  <td className="px-4 py-3 text-ink/50">{new Date(e.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3" onClick={(ev) => ev.stopPropagation()}>
                    <select
                      value={e.status}
                      onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                      aria-label={`Change status for ${e.name}'s enquiry`}
                      className="text-[12.5px] border border-line px-2 py-1 bg-paper"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3" onClick={(ev) => ev.stopPropagation()}>
                    <button onClick={() => setConfirmDelete(e)} aria-label={`Delete enquiry from ${e.name}`} className="text-ink/40 hover:text-red-600">
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setSelected(null)} />
          <div className="relative bg-white max-w-md w-full p-6 border border-line">
            <button onClick={() => setSelected(null)} aria-label="Close" className="absolute top-4 right-4 text-ink/40 hover:text-ink">
              <X size={18} strokeWidth={1.75} />
            </button>
            <p className="eyebrow mb-2">{selected.service || "General enquiry"}</p>
            <h3 className="text-[20px] font-display">{selected.name}</h3>
            <div className="mt-4 space-y-2 text-[14px]">
              <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-steel hover:underline">
                <Phone size={15} strokeWidth={1.75} /> {selected.phone}
              </a>
              {selected.email && (
                <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-steel hover:underline">
                  <Mail size={15} strokeWidth={1.75} /> {selected.email}
                </a>
              )}
              <a
                href={waLink(`Hello ${selected.name}, this is Hussaini Glass regarding your enquiry about ${selected.service || "our services"}.`)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-whatsapp hover:underline"
              >
                <MessageCircle size={15} strokeWidth={1.75} /> Message on WhatsApp
              </a>
            </div>
            {selected.message && (
              <p className="mt-4 text-[13.5px] leading-relaxed text-ink/70 border-t border-line pt-4">
                {selected.message}
              </p>
            )}
            <p className="mt-4 text-[12px] text-ink/40">
              Submitted {new Date(selected.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-white max-w-sm w-full p-6 border border-line">
            <h3 className="text-[16px] font-medium">Delete this enquiry?</h3>
            <p className="mt-2 text-[13.5px] text-ink/60">
              This permanently removes {confirmDelete.name}'s enquiry. This can't be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => handleDelete(confirmDelete.id)} className="btn-dark !bg-red-600 hover:!bg-red-700">
                Delete
              </button>
              <button onClick={() => setConfirmDelete(null)} className="btn-outline">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
