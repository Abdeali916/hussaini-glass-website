import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { isSupabaseConfigured } from "../lib/supabaseClient";

// Wraps every /admin/* route except the login page. Unauthenticated
// visitors — and anyone hitting these routes before Supabase is even
// configured — are redirected to /admin/login rather than seeing any
// admin content or data.
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (!isSupabaseConfigured) {
    return <Navigate to="/admin/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center text-ink/50 text-[14px]">
        Checking session…
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
