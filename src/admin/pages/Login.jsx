import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LogIn, AlertTriangle } from "lucide-react";
import { useAuth } from "../AuthContext";
import { isSupabaseConfigured } from "../../lib/supabaseClient";
import useNoIndex from "../../hooks/useNoIndex";

export default function Login() {
  useNoIndex();
  const { session, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message || "Sign in failed. Check your email and password.");
      return;
    }
    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display text-[22px] text-paper">Hussaini Glass</span>
          <p className="text-[13px] text-paper/50 mt-1">Admin sign in</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-5 flex gap-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[13px] px-4 py-3">
            <AlertTriangle size={16} strokeWidth={1.75} className="shrink-0 mt-0.5" />
            <span>
              Supabase isn't configured yet, so sign-in can't work. Add
              <code className="mx-1 text-[12px]">VITE_SUPABASE_URL</code>
              and
              <code className="mx-1 text-[12px]">VITE_SUPABASE_ANON_KEY</code>
              to <code className="text-[12px]">.env.local</code> — see README.md.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-paper p-7 space-y-4">
          <label className="block">
            <span className="block text-[12.5px] text-ink/60 mb-1.5">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="admin@example.com"
              disabled={!isSupabaseConfigured}
            />
          </label>
          <label className="block">
            <span className="block text-[12.5px] text-ink/60 mb-1.5">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              disabled={!isSupabaseConfigured}
            />
          </label>

          {error && <p className="text-[13px] text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="btn-dark w-full disabled:opacity-40"
          >
            <LogIn size={16} strokeWidth={1.75} />
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <a href="/" className="block text-center mt-6 text-[13px] text-paper/50 hover:text-paper/80">
          ← Back to website
        </a>
      </div>
    </div>
  );
}
