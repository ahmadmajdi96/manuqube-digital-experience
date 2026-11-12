import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Database, ShieldCheck, Server } from "lucide-react";
import { modules } from "@/data/modules";
import crew from "@/assets/crew-lineup.webp.asset.json";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { ClosingCta, GhostCta, PrimaryCta, SectionHead } from "@/components/site/Blocks";
import { PersonaCard } from "@/components/site/PersonaCard";
import { HoldStory } from "@/components/home/HoldStory";

const Qube3D = lazy(() => import("@/components/site/Qube3D"));

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

const proof = ["9 connected modules", "1 shared data model and event backbone", "ISA-95 Level 3 aligned", "Full traceability from raw lot to customer shipment", "Tamper-evident audit trail and electronic signatures"];
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
      {/* HERO */}
      <section className="relative min-h-[100svh] overflow-hidden pt-28">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="glow pointer-events-none absolute right-0 top-10 h-[50rem] w-[50rem] opacity-70" />
        <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="pt-10 lg:pt-20">
            <Reveal><div className="eyebrow flex items-center gap-2"><span className="anim-pulse h-1.5 w-1.5 rounded-full bg-primary" />The Modular Manufacturing Operating System</div></Reveal>
            <Reveal delay={0.05}>
              <h1 className="text-balance mt-6 text-5xl leading-[0.98] sm:text-6xl xl:text-[5.5rem]">
                One operating system for the <span className="text-gradient">entire factory.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
                ManuQube unites execution, quality, planning, engineering, recipes, orders, warehouse and product lifecycle into one modular Manufacturing Operations Management platform. Start with one module. Grow into the whole factory.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-3">
                <PrimaryCta to="/contact">Book a demo</PrimaryCta>
                <GhostCta to="/modules">Explore the modules</GhostCta>
              </div>
            </Reveal>
          </div>
          <div className="relative h-[26rem] sm:h-[34rem] lg:h-[44rem]">
            <ClientOnly fallback={<div className="h-full w-full" />}>
              <Suspense fallback={null}><Qube3D /></Suspense>
            </ClientOnly>
            <div className="pointer-events-none absolute bottom-10 left-0 rounded-xl border border-border bg-card/80 p-3 font-mono text-xs backdrop-blur">
              <div className="text-muted-foreground">LT-2084 / WO-1042 / 14:32</div>
              <div className="mt-1"><span className="text-primary">●</span> Lot on hold. Review the proposed sequence.</div>
            </div>
          </div>
        </div>
        {/* proof marquee */}
        <div className="relative mt-10 overflow-hidden border-y border-border py-5">
          <div className="marquee flex w-max gap-12 whitespace-nowrap">
            {[...proof, ...proof, ...proof, ...proof].map((p, k) => (
              <span key={k} className="flex items-center gap-12 font-mono text-sm uppercase tracking-wider text-muted-foreground">{p}<span className="h-2 w-2 rotate-45 bg-primary" /></span>
            ))}
          </div>
        </div>
      </section>

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
          <SectionHead eyebrow="Manuqube AI / Agent crew" title="Nine modules. Nine characters. One crew." sub="Each module has a campaign character who explains evidence, options and the next owner — in the language planners and operators use on shift." />
        </div>
        <div className="relative mt-12 h-[60vh] overflow-hidden md:h-[80vh]">
          <motion.img src={crew.url} alt="The ManuQube agent crew — nine robots connected to one hub" style={{ scale, y }} className="absolute inset-0 h-full w-full object-cover" />
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
