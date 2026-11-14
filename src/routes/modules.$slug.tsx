import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getModule, modules } from "@/data/modules";
import { ClosingCta } from "@/components/site/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/modules/$slug")({
  loader: ({ params }) => {
    const m = getModule(params.slug);
    if (!m) throw notFound();
    return { slug: m.slug };
  },
  head: ({ params }) => {
    const m = getModule(params.slug);
    if (!m) return { meta: [{ title: "Module not found — ManuQube" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${m.code} — ${m.name} | ManuQube` },
        { name: "description", content: m.intro },
        { property: "og:title", content: `${m.code} — ${m.headline}` },
        { property: "og:description", content: m.intro },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { slug } = Route.useLoaderData();
  const m = getModule(slug)!;
  const idx = modules.indexOf(m);
  const next = modules[(idx + 1) % modules.length]!;
  return (
    <div style={{ ["--mod" as string]: m.color }}>
      <section className="relative overflow-hidden pt-28">
        <div className="glow pointer-events-none absolute -right-40 top-0 h-[50rem] w-[50rem]" />
        <div className="container-x relative grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="pb-16 pt-10">
            <Reveal><Link to="/modules" className="eyebrow inline-flex items-center gap-2 hover:text-foreground"><ArrowLeft className="h-3 w-3" />All modules</Link></Reveal>
            <Reveal delay={0.05}><div className="mt-8 flex items-center gap-4"><span className="rounded-md bg-mod px-3 py-1 font-mono text-lg font-semibold text-graphite">{m.code}</span><span className="text-muted-foreground">{m.name}</span></div></Reveal>
            <Reveal delay={0.1}><h1 className="text-balance mt-6 text-5xl leading-[1.02] md:text-7xl">{m.headline}</h1></Reveal>
            <Reveal delay={0.15}><p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{m.intro}</p></Reveal>
          </div>
          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-t-[2.5rem] border border-b-0 border-border shadow-glow">
              <img src={m.image} alt={`${m.persona.name}, the ${m.code} character`} className="h-full w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-background/80 p-4 backdrop-blur">
                <div className="font-mono text-xs text-mod">{m.code} / {m.persona.name.toUpperCase()}</div>
                <p className="mt-1 text-sm">“{m.persona.signatureLine}”</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-card/40 py-24">
        <div className="container-x">
          <Reveal><div className="eyebrow">Key capabilities</div></Reveal>
          <Stagger className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {m.capabilities.map(([t, d], k) => (
              <StaggerItem key={t} className="group relative bg-background p-7 transition-colors hover:bg-card">
                <div className="font-mono text-xs text-muted-foreground">{String(k + 1).padStart(2, "0")}</div>
                <div className="mt-6 text-lg font-semibold">{t}</div>
                <p className="mt-2 text-muted-foreground">{d}</p>
                <div className="absolute left-0 top-0 h-full w-0.5 scale-y-0 bg-mod transition-transform duration-500 group-hover:scale-y-100" />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x grid gap-12 py-24 lg:grid-cols-2">
        <Reveal>
          <div className="eyebrow">Business outcomes</div>
          <ul className="mt-8 space-y-4">
            {m.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-4 text-xl"><span className="mt-1 rounded-full bg-mod p-1 text-graphite"><Check className="h-4 w-4" /></span>{o}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="eyebrow">Connects with</div>
            <div className="mt-6 flex flex-wrap gap-2">
              {m.connects.split(" · ").map((c) => (<span key={c} className="rounded-full border border-border px-3 py-1.5 text-sm">{c}</span>))}
            </div>
            <Link to="/crew/$slug" params={{ slug: m.slug }} className="mt-10 flex items-center justify-between rounded-xl bg-background p-4 transition-colors hover:bg-accent">
              <span className="flex items-center gap-3"><img src={m.image} alt="" className="h-12 w-10 rounded object-cover" /><span><span className="block text-sm text-muted-foreground">Meet the character</span><span className="font-semibold">{m.persona.name}</span></span></span>
              <ArrowRight className="h-5 w-5 text-mod" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="container-x">
        <Link to="/modules/$slug" params={{ slug: next.slug }} style={{ ["--mod" as string]: next.color }}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-border p-8 transition-colors hover:border-mod">
          <div><div className="eyebrow">Next module</div><div className="mt-2 text-3xl font-semibold md:text-5xl"><span className="font-mono text-mod">{next.code}</span> {next.name}</div></div>
          <ArrowRight className="h-10 w-10 text-mod transition-transform group-hover:translate-x-2" />
        </Link>
      </section>
      <ClosingCta />
    </div>
  );
}
