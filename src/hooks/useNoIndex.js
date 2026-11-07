import { useEffect } from "react";

// Sets <meta name="robots" content="noindex, nofollow"> while a component
// is mounted, restoring "index, follow" on unmount. Used by the admin
// area so search engines are told not to index it even if something
// crawls past robots.txt's Disallow: /admin (e.g. a stray external
// link). This is a single-page app, so this is the only way to vary
// the robots directive per route without server-side rendering — it's
// a second layer on top of robots.txt and Supabase Auth, not a
// replacement for either.
export default function useNoIndex() {
  useEffect(() => {
    const tag = document.querySelector('meta[name="robots"]');
    const prev = tag?.getAttribute("content") ?? "index, follow";
    tag?.setAttribute("content", "noindex, nofollow");
    return () => {
      tag?.setAttribute("content", prev);
    };
  }, []);
}
