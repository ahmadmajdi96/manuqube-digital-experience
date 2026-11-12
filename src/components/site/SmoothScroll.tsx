import { useEffect } from "react";
import Lenis from "lenis";
import { useRouterState } from "@tanstack/react-router";

export function SmoothScroll() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1 });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, [path]);
  return null;
}
