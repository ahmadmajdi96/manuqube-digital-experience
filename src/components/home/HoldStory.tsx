import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getModule } from "@/data/modules";
import { StatePill } from "@/components/site/Blocks";

const steps = [
  { slug: "qms", event: "QMS raises a hold", state: "hold" as const, label: "Quality hold" },
  { slug: "aps", event: "APS marks the schedule infeasible", state: "review" as const, label: "Needs review" },
  { slug: "mes", event: "MES stops the affected units", state: "hold" as const, label: "Blocked" },
  { slug: "wms", event: "WMS blocks the stock", state: "hold" as const, label: "Pick blocked" },
  { slug: "oms", event: "OMS flags the affected customer orders", state: "review" as const, label: "Needs review" },
  { slug: "ams", event: "AMS surfaces who can approve", state: "info" as const, label: "Information" },
];

export function HoldStory() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % steps.length), 4200);
    return () => clearInterval(t);
  }, [paused]);
  const s = steps[i];
  const m = getModule(s.slug)!;
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ol className="space-y-1">
        {steps.map((st, k) => {
          const mm = getModule(st.slug)!;
          const active = k === i;
          return (
            <li key={st.slug}>
              <button onClick={() => setI(k)} style={{ ["--mod" as string]: mm.color }}
                className={`relative flex w-full items-center gap-4 overflow-hidden rounded-xl border p-4 text-left transition-all ${active ? "border-mod bg-card" : "border-transparent hover:bg-card/60"}`}>
                <span className={`font-mono text-xs ${active ? "text-mod" : "text-muted-foreground"}`}>0{k + 1}</span>
                <span className="flex-1">
                  <span className="block font-mono text-xs text-muted-foreground">{mm.code} / {mm.persona.name}</span>
                  <span className="block">{st.event}</span>
                </span>
                {active && !paused && <motion.span layoutId="bar" className="absolute bottom-0 left-0 h-0.5 bg-mod" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 4.2, ease: "linear" }} />}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="relative min-h-[30rem] overflow-hidden rounded-3xl border border-border bg-card" style={{ ["--mod" as string]: m.color }}>
        <AnimatePresence mode="wait">
          <motion.div key={s.slug} className="absolute inset-0 grid md:grid-cols-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.img src={m.image} alt={m.persona.name} className="h-full w-full object-cover" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 4.5 }} />
            <div className="relative flex flex-col justify-between gap-6 p-7">
              <div className="glow absolute inset-0 opacity-40" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded bg-mod px-2 py-0.5 font-mono text-xs font-semibold text-graphite">{m.code}</span>
                  <StatePill state={s.state}>{s.label}</StatePill>
                </div>
                <h3 className="mt-6 text-3xl">{m.persona.name}</h3>
                <p className="mt-2 text-muted-foreground">{m.persona.tagline}</p>
              </div>
              <div className="relative space-y-4">
                <div className="rounded-xl border border-border bg-background/70 p-4 backdrop-blur">
                  <div className="eyebrow mb-2">Signal</div>
                  <p className="text-sm">{m.persona.signal}</p>
                </div>
                <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="rounded-xl border border-mod/40 bg-background/80 p-4 font-mono text-sm backdrop-blur">
                  <span className="text-mod">›</span> {m.persona.interfaceCopy}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
