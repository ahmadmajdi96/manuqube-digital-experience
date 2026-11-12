import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getModule } from "@/data/modules";
import { ClosingCta, PageHero, SectionHead } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/connected")({
  head: () => ({
    meta: [
      { title: "Connected by design — end-to-end flows | ManuQube" },
      { name: "description", content: "Order to cash, engineering change, quality containment and recipe lab-to-line flows across the nine ManuQube modules." },
      { property: "og:title", content: "Connected by design — end-to-end flows | ManuQube" },
      { property: "og:description", content: "Order to cash, engineering change, quality containment and recipe lab-to-line flows across the nine ManuQube modules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Connected,
});

const flow1 = [
  ["oms", "A customer order arrives in OMS from ERP or a sales channel; OMS checks Available-to-Promise."],
  ["aps", "APS receives the demand and builds a finite-capacity schedule, checking materials in WMS and holds in QMS."],
  ["ams", "The planner approves; the schedule is released to MES. MES runs it with qualified operators per shift, with access set in AMS."],
  ["mes", "MES executes step by step using the recipe from RMS and the line engineered in EMS, with BOM and routing from PLMS."],
  ["qms", "QMS inspects in-process; any failure creates a non-conformance and, if needed, a hold."],
  ["wms", "Finished goods are received into WMS, picked, packed and shipped; OMS confirms delivery to the customer and ERP."],
];
const chains: { title: string; steps: [string, string][] }[] = [
  { title: "Flow 2 — Engineering change to shop floor", steps: [["plms", "Change order"], ["ems", "Updates line steps and HMIs, impact analysis and release readiness"], ["rms", "Versions the recipe if needed"], ["aps", "Flags affected schedules as stale"], ["mes", "Runs the new revision only after approval and e-signature"]] },
  { title: "Flow 3 — Quality event to containment", steps: [["qms", "Raises a hold"], ["aps", "Marks the schedule infeasible"], ["mes", "Stops the affected units"], ["wms", "Blocks the stock"], ["oms", "Flags the affected customer orders"], ["mes", "Genealogy produces the recall scope"], ["qms", "CAPA closes the loop"]] },
  { title: "Flow 4 — Recipe from lab to line", steps: [["rms", "Trial → validation → review queue → signed approval"], ["mes", "Published to MES → batch run"], ["qms", "Results return as QA insights to RMS"]] },
];
const ownership = [
  ["Customer orders", "OMS", "APS, WMS, MES"], ["Items, BOMs, routings", "PLMS", "EMS, MES, APS, RMS"], ["Recipes & formulas", "RMS", "MES"],
  ["Lines, stations, HMIs", "EMS", "MES"], ["Schedules", "APS", "MES"], ["Users, roles & permissions", "AMS", "All modules"],
  ["Execution & genealogy", "MES", "QMS, OMS, APS"], ["Inspections, holds, CAPA", "QMS", "MES, APS, WMS, OMS"], ["Stock & locations", "WMS", "OMS, APS, MES"],
];

function Chip({ slug }: { slug: string }) {
  const m = getModule(slug)!;
  return (
    <Link to="/crew/$slug" params={{ slug }} style={{ ["--mod" as string]: m.color }} className="group flex items-center gap-2">
      <img src={m.image} alt={m.persona.name} className="h-10 w-10 rounded-full border-2 border-mod object-cover object-top transition-transform group-hover:scale-110" />
      <span className="font-mono text-sm text-mod">{m.code}</span>
    </Link>
  );
}

function Connected() {
  return (
    <>
      <PageHero eyebrow="Connected by design" title="End-to-end flows across one backbone." sub="An order, a recipe, a quality hold or a stock movement means the same thing everywhere." />
      <section className="container-x pb-24">
        <SectionHead eyebrow="Flow 1" title="Order to Cash" />
        <div className="relative mt-12">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary via-border to-transparent" />
          <div className="space-y-6">
            {flow1.map(([s, t], k) => (
              <Reveal key={k} delay={k * 0.05} className="relative flex items-start gap-6 pl-0">
                <div className="relative z-10 shrink-0"><Chip slug={s} /></div>
                <div className="flex-1 rounded-2xl border border-border bg-card p-5"><span className="mr-3 font-mono text-xs text-muted-foreground">0{k + 1}</span>{t}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {chains.map((c) => (
        <section key={c.title} className="border-t border-border py-20">
          <div className="container-x">
            <Reveal><h2 className="text-3xl md:text-4xl">{c.title}</h2></Reveal>
            <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
              {c.steps.map(([s, t], k) => (
                <Reveal key={k} delay={k * 0.06} className="flex shrink-0 items-center gap-4">
                  <div className="w-60 rounded-2xl border border-border bg-card p-5"><Chip slug={s} /><p className="mt-4 text-sm text-muted-foreground">{t}</p></div>
                  {k < c.steps.length - 1 && <ArrowRight className="h-5 w-5 shrink-0 text-primary" />}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="container-x py-24">
        <SectionHead eyebrow="Data ownership" title="Who owns what." sub="Every record has one owner module. Everyone else reads it." />
        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left">
            <thead className="bg-card font-mono text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="p-4">Data</th><th className="p-4">Owner module</th><th className="p-4">Used by</th></tr></thead>
            <tbody>
              {ownership.map(([d, o, u]) => {
                const m = getModule(o.toLowerCase())!;
                return (
                  <tr key={d} className="border-t border-border transition-colors hover:bg-card/60" style={{ ["--mod" as string]: m.color }}>
                    <td className="p-4">{d}</td><td className="p-4"><span className="rounded bg-mod px-2 py-0.5 font-mono text-xs font-semibold text-graphite">{o}</span></td><td className="p-4 font-mono text-sm text-muted-foreground">{u}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Reveal>
      </section>
      <ClosingCta />
    </>
  );
}
