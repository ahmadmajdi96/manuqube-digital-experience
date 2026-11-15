import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta, PageHero, SectionHead } from "@/components/site/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries, roles and results — ManuQube" },
      { name: "description", content: "Why ManuQube for food & beverage, chemicals, discrete, packaging and regulated manufacturing — and what every role gets." },
      { property: "og:title", content: "Industries, roles and results — ManuQube" },
      { property: "og:description", content: "Why ManuQube for food & beverage, chemicals, discrete, packaging and regulated manufacturing — and what every role gets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: P,
});
function G({ items, cols = "lg:grid-cols-3" }: { items: string[][]; cols?: string }) {
  return (
    <Stagger className={`mt-12 grid gap-5 md:grid-cols-2 ${cols}`}>
      {items.map(([t, d], k) => (
        <StaggerItem key={t} className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary">
          <div className="font-mono text-xs text-primary">{String(k + 1).padStart(2, "0")}</div>
          <h3 className="mt-6 text-2xl">{t}</h3>
          <p className="mt-3 text-muted-foreground">{d}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
const why = [["Modular, not monolithic", "Start with MES, QMS or WMS alone; add modules without re-integration."], ["One data model", "No duplicate masters, no nightly reconciliations."], ["Closed loops", "Plan → execute → verify → learn, automatically."], ["Compliance by default", "Audit chain, e-signatures, approvals, retention and legal hold built in."], ["Shop-floor ready", "Works offline for critical actions, connects to 11 machine protocols through the edge."], ["Open", "APIs, signed webhooks, import/export and ERP round trips."]];
const ind = [["Food & beverage", "Recipes, lot expiry, FEFO, allergen-safe changeovers, recall in minutes."], ["Chemicals & process", "Formula versions, batch records, SPC."], ["Discrete & assembly", "Routings, stations, serial genealogy, work instructions."], ["Packaging & plastics", "High-speed lines, OEE, waste and downtime reasons."], ["Regulated manufacturing", "Part 11-style e-signatures, tamper-evident audit, CAPA."]];
const roles = [["Plant manager", "Live control center, OEE, KPIs and plant analytics"], ["Production planner", "Finite-capacity schedules, conflicts and approvals"], ["Shift supervisor", "Assignments, shifts, Andon and downtime"], ["Operator", "Clear work instructions, guided steps and simple screens"], ["Quality manager", "Inspections, SPC, holds, NCs and CAPA"], ["Process / R&D engineer", "Recipes, trials, validation and approvals"], ["Manufacturing engineer", "Lines, stations, HMIs, routings and changes"], ["Warehouse lead", "Receiving, putaway, picking, packing and cycle counts"], ["Order desk / customer service", "Order status, availability and returns"], ["IT & OT team", "APIs, integrations, edge fleet, roles and audit"]];
const results = ["Higher on-time delivery through realistic, constraint-aware schedules", "Lower scrap and rework through enforced steps and in-line quality", "Faster recalls with complete lot genealogy", "Less paperwork and manual data entry across shifts", "Faster audits with signed, exportable records"];
function P() {
  return (<>
    <PageHero eyebrow="Why ManuQube" position="82% center" tone="warm" title="Built for the way batch manufacturing really works." sub="Keep production on plan when the factory changes." />
    <section className="container-x pb-24"><SectionHead eyebrow="Why ManuQube" title="Six reasons factories switch." /><G items={why} /></section>
    <section className="border-y border-border bg-card/40 py-24"><div className="container-x"><SectionHead eyebrow="Industries" title="One platform, five manufacturing worlds." /><G items={ind} cols="lg:grid-cols-5" /></div></section>
    <section className="container-x py-24"><SectionHead eyebrow="Who uses ManuQube" title="Every role, the same truth, at the same moment." />
      <div className="mt-12 divide-y divide-border border-y border-border">{roles.map(([r, d], k) => (
        <Reveal key={r} delay={k * 0.03} className="group grid gap-2 py-5 transition-colors hover:bg-card/50 md:grid-cols-[1fr_2fr]"><div className="text-xl font-semibold group-hover:text-primary">{r}</div><div className="text-muted-foreground">{d}</div></Reveal>))}</div>
    </section>
    <section className="container-x pb-12"><SectionHead eyebrow="Results you can expect" title="What changes on the floor." sub="Indicative ranges — replace with verified customer figures when available." />
      <Stagger className="mt-10 grid gap-4 md:grid-cols-5">{results.map((r) => <StaggerItem key={r} className="rounded-2xl bg-primary p-6 text-primary-foreground"><p className="text-lg font-medium">{r}</p></StaggerItem>)}</Stagger>
    </section>
    <ClosingCta />
  </>);
}
