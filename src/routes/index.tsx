import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Database, ShieldCheck, Server } from "lucide-react";
import { modules } from "@/data/modules";
import crew from "@/assets/crew-lineup.webp";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { ClosingCta, GhostCta, PrimaryCta, SectionHead } from "@/components/site/Blocks";
import { PersonaCard } from "@/components/site/PersonaCard";
import { HoldStory } from "@/components/home/HoldStory";
import { PlatformHero } from "@/components/home/PlatformHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ManuQube — One operating system for the entire factory" },
      { name: "description", content: "ManuQube unites execution, quality, planning, engineering, recipes, orders, warehouse and product lifecycle into one modular MOM platform." },
      { property: "og:title", content: "ManuQube — One operating system for the entire factory" },
      { property: "og:description", content: "Nine connected modules. One shared data model and event backbone. Start with one module, grow into the whole factory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const loop = [
  ["Plan it", "APS"], ["Define it", "PLMS · RMS · EMS"], ["Make it", "MES"], ["Check it", "QMS"], ["Store & ship it", "WMS"], ["Deliver it", "OMS"],
];

function Home() {
  const crewRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: crewRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.05, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      <PlatformHero />

      {/* PROBLEM */}
      <section className="container-x grid gap-16 py-28 lg:grid-cols-2">
        <SectionHead eyebrow="The problem" title={<>ManuQube replaces the spaghetti <span className="text-primary">with a cube.</span></>} />
        <div className="space-y-6 text-lg text-muted-foreground">
          <Reveal><p>Most factories run on a patchwork: an MES here, a quality spreadsheet there, a planning tool nobody trusts, and a warehouse system that doesn't know what production just consumed. Every link between them is a custom bridge — the "spaghetti" that breaks every time something changes.</p></Reveal>
          <Reveal delay={0.1}><p className="text-foreground">Every module speaks the same language, shares the same master data, and exchanges the same signed events — so an order, a recipe, a quality hold or a stock movement means the same thing everywhere.</p></Reveal>
        </div>
      </section>

      {/* CREW LINEUP */}
      <section ref={crewRef} className="relative">
        <div className="container-x">
          <SectionHead eyebrow="Manuqube / Agent crew" title="Nine modules. Nine characters. One crew." sub="Each module has a campaign character who explains evidence, options and the next owner — in the language planners and operators use on shift." />
        </div>
        <div className="relative mt-12 h-[60vh] overflow-hidden md:h-[80vh]">
          <motion.img src={crew} alt="The ManuQube agent crew — nine robots connected to one hub" style={{ scale, y }} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2"><PrimaryCta to="/crew">Meet the crew</PrimaryCta></div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="container-x py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="The nine modules" title="Complete on its own. Stronger together." />
          <Reveal><GhostCta to="/modules">All modules</GhostCta></Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <StaggerItem key={m.slug}>
              <PersonaCard m={m} to="modules" />
              <div className="mt-4 px-1" style={{ ["--mod" as string]: m.color }}>
                <div className="font-mono text-xs text-mod">{m.code} — {m.name}</div>
                <p className="mt-1 text-sm text-muted-foreground">{m.oneLiner}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* LOOP */}
      <section className="border-y border-border bg-card/40 py-28">
        <div className="container-x">
          <SectionHead eyebrow="How it fits together" title="One loop, one data model, one audit trail." sub="AMS controls who can do what at every step." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            {loop.map(([a, b], k) => (
              <Reveal key={a} delay={k * 0.07} className="group relative bg-background p-6 transition-colors hover:bg-card">
                <div className="font-mono text-xs text-muted-foreground">0{k + 1}</div>
                <div className="mt-10 text-xl font-semibold">{a}</div>
                <div className="mt-1 font-mono text-sm text-primary">{b}</div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOLD STORY */}
      <section className="container-x py-28">
        <SectionHead eyebrow="Flow 3 — Quality event to containment" title="Follow a held lot through the whole factory." sub="Illustrative data. Each character names the affected lot, order or line — and who reviews the change." />
        <div className="mt-14"><HoldStory /></div>
        <Reveal className="mt-8"><Link to="/connected" className="inline-flex items-center gap-1 text-primary hover:underline">See every end-to-end flow <ArrowUpRight className="h-4 w-4" /></Link></Reveal>
      </section>

      {/* TECH */}
      <section className="container-x py-12">
        <div className="grain relative overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-14">
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <SectionHead eyebrow="The technology behind the factory" title="Confidence on the floor. Strength at the core." />
              <Reveal><p className="mt-6 text-muted-foreground">ManuQube pairs clear manufacturing workflows with a technology foundation built around structured data, controlled access and managed infrastructure. PostgreSQL-backed MES services, Kubernetes orchestration, replicated storage and separate release environments support the work behind every screen.</p></Reveal>
              <Reveal><div className="mt-8"><GhostCta to="/technology">Explore Technology & Infrastructure</GhostCta></div></Reveal>
            </div>
            <Stagger className="grid gap-4">
              {[
                [Database, "Data integrity", "Enforce critical operational rules at the database layer."],
                [ShieldCheck, "Controlled access", "AMS defines who can do what; backend authorization and infrastructure controls support those boundaries."],
                [Server, "Operational resilience", "Service orchestration, replicated storage and monitoring support recovery and informed maintenance."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Database;
                return (
                  <StaggerItem key={t as string} className="flex gap-5 rounded-2xl border border-border bg-background/70 p-6 backdrop-blur">
                    <I className="h-6 w-6 shrink-0 text-primary" />
                    <div><div className="text-lg font-semibold">{t as string}</div><p className="mt-1 text-muted-foreground">{d as string}</p></div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
