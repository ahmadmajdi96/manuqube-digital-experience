import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { getModule, modules, crewPrinciple } from "@/data/modules";
import { ClosingCta } from "@/components/site/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import processEngineering from "@/assets/process-engineering.jpg";

export const Route = createFileRoute("/crew/$slug")({
  loader: ({ params }) => {
    if (!getModule(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const m = getModule(params.slug);
    if (!m) return { meta: [{ title: "Character not found — ManuQube" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${m.persona.name} — ${m.code} character | Manuqube` },
        { name: "description", content: `${m.persona.tagline} ${m.persona.personality}` },
        { property: "og:title", content: `${m.code} / ${m.persona.name} — ${m.persona.tagline}` },
        { property: "og:description", content: m.persona.personality },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PersonaPage,
});

function PersonaPage() {
  const { slug } = Route.useLoaderData();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const nameX = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const [tab, setTab] = useState<"profile" | "trust">("profile");
  const m = getModule(slug);
  if (!m) return null;
  const p = m.persona;
  const idx = modules.indexOf(m);
  const prev = modules[(idx - 1 + modules.length) % modules.length];
  const next = modules[(idx + 1) % modules.length];
  if (!prev || !next) return null;

  const profile: [string, string][] = [
    ["Who it serves", p.serves], ["What it owns", p.owns], ["What it reads", p.reads],
    ["Handoff", p.handoff], ["What success looks like", p.success],
  ];
  const trust: [string, string][] = [
    ["Module scope", p.scope], ["Business outcomes", p.outcomes], ["Technology foundation", p.technology],
    ["How it communicates trust", p.trust], ["Where to use it", p.whereToUse],
  ];

  return (
    <div style={{ ["--mod" as string]: m.color }}>
      <section ref={ref} className="industrial-persona-hero relative overflow-hidden pt-24">
        <img src={processEngineering} alt="" className="industrial-module-background" width={1920} height={1024} />
        <motion.div style={{ x: nameX }} className="industrial-persona-watermark pointer-events-none absolute top-1/3 whitespace-nowrap font-bold leading-none text-mod/10">
          {p.name} {p.name}
        </motion.div>
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
          <div className="order-2 lg:order-1">
            <Reveal><Link to="/crew" className="eyebrow inline-flex items-center gap-2 hover:text-foreground"><ArrowLeft className="h-3 w-3" />The crew</Link></Reveal>
            <Reveal delay={0.05}><div className="mt-8 font-mono text-sm text-mod">{m.code} / {m.name.toUpperCase()}</div></Reveal>
            <Reveal delay={0.1}><h1 className="mt-3 text-6xl md:text-8xl">{p.name}</h1></Reveal>
            <Reveal delay={0.15}><p className="mt-4 text-2xl text-muted-foreground">{p.tagline}</p></Reveal>
            <Reveal delay={0.2}><p className="mt-8 text-lg">{p.personality}</p></Reveal>
          </div>
          <motion.div style={{ y: imgY }} className="order-1 lg:order-2">
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="industrial-portrait relative mx-auto aspect-[2/3] max-w-sm overflow-hidden">
              <img src={m.image} alt={`${p.name} — ${p.visual}`} className="h-full w-full object-cover" />
              <div className="absolute left-4 top-4 rounded bg-mod px-2 py-1 font-mono text-xs font-semibold text-graphite">{m.code}</div>
            </motion.div>
          </motion.div>
          <div className="order-3 space-y-5">
            {[["Temperament", p.temperament], ["Voice", p.voice], ["Visual identity", p.visual], ["Signature movement", p.movement]].map(([k, v], i) => (
              <Reveal key={k} delay={0.1 + i * 0.07}>
                <div className="border-l-2 border-mod/50 pl-4">
                  <div className="eyebrow">{k}</div>
                  <p className="mt-1 text-sm">{v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal>
          <figure className="relative rounded-3xl border border-mod/40 bg-card p-10 md:p-16">
            <div className="eyebrow">Signature line</div>
            <blockquote className="text-balance mt-6 text-3xl leading-tight md:text-5xl">“{p.signatureLine}”</blockquote>
            <figcaption className="mt-6 font-mono text-sm text-mod">— {m.code} / {p.name}</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="container-x grid gap-6 pb-20 lg:grid-cols-3">
        <Reveal className="rounded-2xl border border-border bg-card p-7">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-hold anim-pulse" /><span className="eyebrow">Signal</span></div>
          <p className="mt-4 text-lg">{p.signal}</p>
        </Reveal>
        <Reveal delay={0.08} className="rounded-2xl border border-border bg-card p-7">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-info" /><span className="eyebrow">Response</span></div>
          <p className="mt-4 text-lg">{p.response}</p>
        </Reveal>
        <Reveal delay={0.16} className="rounded-2xl border border-border bg-background p-7 font-mono">
          <div className="eyebrow">Example interface copy</div>
          <div className="mt-4 rounded-lg border border-border bg-card p-4 text-sm"><span className="text-mod">●</span> {p.interfaceCopy}</div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal><h2 className="text-4xl">Operating profile</h2></Reveal>
            <div className="flex rounded-full border border-border p-1">
              {(["profile", "trust"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`relative rounded-full px-5 py-2 text-sm transition-colors ${tab === t ? "text-graphite" : "text-muted-foreground"}`}>
                  {tab === t && <motion.span layoutId="tab" className="absolute inset-0 rounded-full bg-mod" />}
                  <span className="relative">{t === "profile" ? "Operating profile" : "Capabilities, value & trust"}</span>
                </button>
              ))}
            </div>
          </div>
          <Stagger key={tab} className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {(tab === "profile" ? profile : trust).map(([k, v]) => (
              <StaggerItem key={k} className="bg-background p-7"><div className="eyebrow">{k}</div><p className="mt-3 text-lg leading-relaxed">{v}</p></StaggerItem>
            ))}
            <StaggerItem className="flex flex-col justify-between bg-background p-7">
              <div className="flex items-center gap-2 text-mod"><ShieldAlert className="h-5 w-5" /><span className="eyebrow text-mod">Decision boundary</span></div>
              <p className="mt-3 text-lg leading-relaxed">{p.boundary}</p>
            </StaggerItem>
          </Stagger>
          <Reveal><p className="mt-8 max-w-3xl text-sm text-muted-foreground">{crewPrinciple}</p></Reveal>
        </div>
      </section>

      <section className="container-x grid gap-4 py-16 md:grid-cols-2">
        {[prev, next].map((n, k) => (
          <Link key={n.slug} to="/crew/$slug" params={{ slug: n.slug }} style={{ ["--mod" as string]: n.color }}
            className={`group flex items-center gap-5 rounded-2xl border border-border p-5 transition-colors hover:border-mod ${k ? "md:flex-row-reverse md:text-right" : ""}`}>
            <img src={n.image} alt="" className="h-24 w-20 rounded-lg object-cover" />
            <div className="flex-1"><div className="eyebrow">{k ? "Next" : "Previous"}</div><div className="mt-1 text-2xl font-semibold">{n.persona.name}</div><div className="font-mono text-xs text-mod">{n.code}</div></div>
            {k ? <ArrowRight className="h-6 w-6 text-mod" /> : <ArrowLeft className="h-6 w-6 text-mod" />}
          </Link>
        ))}
      </section>
      <div className="container-x"><Link to="/modules/$slug" params={{ slug: m.slug }} className="inline-flex items-center gap-2 text-mod hover:underline">Explore the {m.code} module <ArrowRight className="h-4 w-4" /></Link></div>
      <ClosingCta />
    </div>
  );
}
