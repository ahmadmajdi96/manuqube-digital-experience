import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { modules } from "@/data/modules";
import { ClosingCta, PageHero } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/modules/")({
  head: () => ({
    meta: [
      { title: "The nine modules — ManuQube MOM" },
      { name: "description", content: "MES, OMS, QMS, EMS, RMS, PLMS, AMS, APS and WMS — nine modules on one data model and event backbone." },
      { property: "og:title", content: "The nine ManuQube modules" },
      { property: "og:description", content: "Start with one module. Every module you add plugs into the same backbone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModulesPage,
});

const groups = ["Plan & promise", "Define & engineer", "Execute, verify, store & ship", "Govern access"] as const;

function ModulesPage() {
  return (
    <>
      <PageHero eyebrow="Nine modules under MOM" title="Every cube is complete on its own." sub="Each module works on its own and gets stronger as you connect more. One sign-in, one data model, one audit trail." />
      <div className="container-x space-y-20 pb-10">
        {groups.map((g) => (
          <section key={g}>
            <Reveal><div className="eyebrow mb-6 border-b border-border pb-4">{g}</div></Reveal>
            <div className="divide-y divide-border">
              {modules.filter((m) => m.group === g).map((m, k) => (
                <Reveal key={m.slug} delay={k * 0.05}>
                  <Link to="/modules/$slug" params={{ slug: m.slug }} style={{ ["--mod" as string]: m.color }}
                    className="group grid items-center gap-6 py-6 md:grid-cols-[6rem_8rem_1fr_1.4fr_auto]">
                    <div className="h-24 w-20 overflow-hidden rounded-lg"><img src={m.image} alt={m.persona.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                    <div className="font-mono text-3xl font-medium text-mod">{m.code}</div>
                    <div><div className="text-xl font-semibold">{m.name}</div><div className="text-sm text-muted-foreground">Character: {m.persona.name}</div></div>
                    <p className="text-muted-foreground">{m.oneLiner}</p>
                    <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all group-hover:rotate-45 group-hover:text-mod" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
      <ClosingCta />
    </>
  );
}
