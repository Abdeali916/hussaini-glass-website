import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Clock, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { fetchEnquiries } from "../../lib/enquiries";

export default function Dashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const { data, error } = await fetchEnquiries();
      if (cancelled) return;
      if (error) setError("Couldn't load enquiries from Supabase.");
      setEnquiries(data);
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const total = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "New").length;
  const contacted = enquiries.filter((e) => e.status === "Contacted").length;
  const completed = enquiries.filter((e) => e.status === "Completed").length;
  const recent = enquiries.slice(0, 5);

  return (
    <div>
      <h1 className="text-[24px] font-display">Dashboard</h1>
      <p className="mt-1 text-[14px] text-ink/55">Real-time overview of website enquiries.</p>

      {error && (
        <div className="mt-6 flex gap-2.5 bg-red-50 border border-red-200 text-red-700 text-[13px] px-4 py-3">
          <AlertCircle size={16} strokeWidth={1.75} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Inbox} label="Total Enquiries" value={loading ? "—" : total} />
        <StatCard icon={Sparkles} label="New" value={loading ? "—" : newCount} accent="text-steel" />
        <StatCard icon={Clock} label="Contacted" value={loading ? "—" : contacted} accent="text-amber-600" />
        <StatCard icon={CheckCircle2} label="Completed" value={loading ? "—" : completed} accent="text-emerald-600" />
      </div>

      <div className="mt-8 bg-white border border-line">
        <div className="px-5 py-4 border-b border-line flex items-center justify-between">
          <h2 className="text-[15px] font-medium">Recent enquiries</h2>
          <Link to="/admin/enquiries" className="text-[13px] text-steel hover:underline underline-offset-4">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="px-5 py-8 text-center text-[13.5px] text-ink/45">Loading…</p>
        ) : recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-[13.5px] text-ink/45">
            No enquiries yet — they'll appear here as soon as someone submits the quote form.
          </p>
        ) : (
          <div className="divide-y divide-line">
            {recent.map((e) => (
              <div key={e.id} className="px-5 py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[14px] font-medium truncate">{e.name}</p>
                  <p className="text-[12.5px] text-ink/50 truncate">{e.service || "—"} · {e.phone}</p>
                </div>
                <StatusPill status={e.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent = "text-ink" }) {
  return (
    <div className="bg-white border border-line p-5">
      <Icon size={20} strokeWidth={1.5} className={accent} />
      <p className="mt-4 text-[28px] font-display leading-none">{value}</p>
      <p className="mt-1.5 text-[13px] text-ink/55">{label}</p>
    </div>
  );
}

export function StatusPill({ status }) {
  const styles = {
    New: "bg-steel/10 text-steel",
    Contacted: "bg-amber-100 text-amber-700",
    Completed: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={`shrink-0 text-[12px] font-medium px-2.5 py-1 ${styles[status] || "bg-mist text-ink/60"}`}>
      {status}
    </span>
  );
}
