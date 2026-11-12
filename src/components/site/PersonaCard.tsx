import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Module } from "@/data/modules";

export function PersonaCard({ m, to = "crew" }: { m: Module; to?: "crew" | "modules" }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const gx = useTransform(x, (v) => `${v * 100}%`), gy = useTransform(y, (v) => `${v * 100}%`);
  const inner = (
    <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ["--mod" as string]: m.color }}
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height); }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-card">
      <img src={m.image} alt={`${m.persona.name} — ${m.code} character`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: useTransform([gx, gy] as never, ([a, b]: string[]) => `radial-gradient(circle at ${a} ${b}, color-mix(in oklab, var(--mod) 35%, transparent), transparent 55%)`) }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute left-4 top-4 rounded-md bg-mod px-2 py-1 font-mono text-xs font-semibold text-graphite">{m.code}</div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="text-3xl font-semibold">{m.persona.name}</div>
        <div className="mt-1 text-sm text-muted-foreground">{m.persona.tagline}</div>
        <div className="mt-4 h-px w-0 bg-mod transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.div>
  );
  return to === "crew"
    ? <Link to="/crew/$slug" params={{ slug: m.slug }} className="block">{inner}</Link>
    : <Link to="/modules/$slug" params={{ slug: m.slug }} className="block">{inner}</Link>;
}
