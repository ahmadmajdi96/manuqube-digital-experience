import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta, PageHero, SectionHead } from "@/components/site/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "What is a Manufacturing Operating System? — ManuQube Platform" },
      { name: "description", content: "ManuQube is a complete ISA-95 Level 3 MOM platform between your ERP and your shop floor." },
      { property: "og:title", content: "What is a Manufacturing Operating System? — ManuQube Platform" },
      { property: "og:description", content: "ManuQube is a complete ISA-95 Level 3 MOM platform between your ERP and your shop floor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Platform,
});

const foundations = [
  ["Shared master data", "Products, materials, units of measure, lines, stations and customers are defined once and used by every module, with revisions and effective dates so history is never rewritten."],
  ["Event backbone", "Modules talk through a shared, signed event envelope with idempotency and de-duplication. An approved schedule, a quality hold or a goods receipt is published once and consumed safely by every module that needs it."],
  ["Command Access Hub", "One sign-in and one role model across all modules. Permissions are checked per person, per module, per action."],
  ["Tamper-evident audit", "Every change is recorded in a hash-chained audit log that cannot be edited or deleted, with verification, CSV export and retention settings."],
  ["Electronic signatures and approvals", "Password-plus-reason signatures, configurable approval workflows, escalation and blocked self-approval — designed for regulated environments."],
  ["Open integration", "Signed inbound endpoints, outbound queues, hashed API keys, message logs with retry, health checks, scheduled runs and AI-assisted explanations for failed messages."],
  ["Edge connectivity", "Machine drivers for 11 industrial protocols, tag limits with hold-on-breach, simulated, manual and edge-box commands, and safety sign-off before any command is allowed."],
];
const standards = [
  ["ISA-95 / IEC 62264", "Enterprise-control integration model"],
  ["IEC 62443", "Industrial cybersecurity"],
  ["21 CFR Part 11", "Electronic records and signatures"],
  ["ISO 9001", "Quality management principles"],
  ["FEFO / lot expiry", "Recall readiness for food, chemical and pharma-adjacent manufacturing"],
];
const layers = [
  { label: "Plan & promise", mods: ["OMS", "APS"] },
  { label: "Define & engineer", mods: ["PLMS", "RMS", "EMS"] },
  { label: "Execute, verify, store & ship", mods: ["MES", "QMS", "WMS"] },
];

function Platform() {
  return (
    <>
      <PageHero eyebrow="Platform" position="center 22%" tone="cool" title="What is a Manufacturing Operating System?" sub="The international standard ISA-95 (IEC 62264) splits a manufacturing business into levels. Level 3 — Manufacturing Operations Management (MOM) — is everything between ERP and machines." />
      <section className="container-x grid gap-12 pb-24 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-6 text-lg text-muted-foreground">
          <p>Level 4 is business planning (ERP). Levels 0–2 are machines, sensors and control systems. <span className="text-foreground">Level 3 — MOM</span> is production, quality, inventory movement, maintenance, recipes, detailed scheduling and product tracking.</p>
          <p className="text-foreground">ManuQube is a complete Level 3 platform. It sits between your ERP and your shop floor and turns business plans into finished, traceable, shipped products.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-3 font-mono text-sm">
            <div className="rounded-xl border border-border p-4 text-center text-muted-foreground">ERP · E-commerce · Sales channels · Suppliers <span className="float-right text-xs">L4</span></div>
            <div className="mx-auto h-6 w-px bg-primary" />
            <div className="relative rounded-2xl border-2 border-primary p-4 shadow-glow">
              <div className="absolute -top-3 left-4 bg-background px-2 text-primary">ManuQube MOM · L3</div>
              <div className="space-y-2 pt-2">
                {layers.map((l) => (
                  <div key={l.label} className="flex flex-wrap items-center gap-2 rounded-lg bg-card p-3">
                    {l.mods.map((x) => <span key={x} className="rounded bg-secondary px-2 py-1">{x}</span>)}
                    <span className="ml-auto text-xs text-muted-foreground">→ {l.label}</span>
                  </div>
                ))}
                <div className="rounded-lg border border-dashed border-primary/50 p-3 text-center text-xs text-primary">Shared master data · Event backbone · Access hub (AMS) · Audit</div>
              </div>
            </div>
            <div className="mx-auto h-6 w-px bg-primary" />
            <div className="rounded-xl border border-border p-4 text-center text-muted-foreground">Edge gateway · PLC · SCADA · Machines · Sensors <span className="float-right text-xs">L0–2</span></div>
          </div>
        </Reveal>
      </section>
      <section className="border-y border-border bg-card/40 py-24">
        <div className="container-x">
          <SectionHead eyebrow="Platform foundations" title="Seven foundations under every module." />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {foundations.map(([t, d], k) => (
              <StaggerItem key={t} className={`rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary ${k === 0 ? "lg:col-span-2" : ""}`}>
                <div className="font-mono text-xs text-primary">{String(k + 1).padStart(2, "0")}</div>
                <h3 className="mt-6 text-2xl">{t}</h3>
                <p className="mt-3 text-muted-foreground">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="container-x py-24">
        <SectionHead eyebrow="Standards we align with" title="Built around the standards your auditors know." />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {standards.map(([a, b], k) => (
            <Reveal key={a} delay={k * 0.05} className="grid gap-2 py-6 md:grid-cols-[1fr_2fr]">
              <div className="font-mono text-xl text-primary">{a}</div><div className="text-lg">{b}</div>
            </Reveal>
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
