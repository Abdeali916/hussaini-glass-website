import { useEffect, useRef, useState } from "react";

// Lightweight IntersectionObserver hook used for a single, restrained
// reveal-on-scroll moment per section (not per card) — see frontend
// design guidance: one orchestrated effect reads as intentional,
// scattered fade-ins on every element read as generated.
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
