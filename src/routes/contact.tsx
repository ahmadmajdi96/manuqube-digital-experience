import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { modules } from "@/data/modules";
import { PageHero } from "@/components/site/Blocks";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a demo — ManuQube" },
      { name: "description", content: "Talk to a manufacturing expert. Choose the module you need most and see a held lot traced to an affected order and a proposed schedule change." },
      { property: "og:title", content: "Book a demo — ManuQube" },
      { property: "og:description", content: "Talk to a manufacturing expert. Choose the module you need most and see a held lot traced to an affected order and a proposed schedule change." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: P,
});
const field = "w-full rounded-xl border border-input bg-card px-4 py-3 outline-none transition-colors focus:border-primary";
function P() {
  const [sel, setSel] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  return (<>
    <PageHero eyebrow="Book a demo" title="Talk to a manufacturing expert." sub="Follow a held lot to an affected order and a proposed schedule change. See the evidence and who reviews the change." />
    <section className="container-x grid gap-12 pb-24 lg:grid-cols-[1.3fr_1fr]">
      <Reveal>
        {sent ? (
          <div className="rounded-3xl border border-approved bg-card p-12"><Check className="h-10 w-10 text-primary" /><h2 className="mt-6 text-3xl">Request recorded.</h2><p className="mt-3 text-muted-foreground">A manufacturing expert will follow up with next steps.</p></div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5 rounded-3xl border border-border bg-card/50 p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <input required placeholder="Full name" className={field} />
              <input required type="email" placeholder="Work email" className={field} />
              <input placeholder="Company" className={field} />
              <input placeholder="Role" className={field} />
            </div>
            <div>
              <div className="eyebrow mb-3">Modules of interest</div>
              <div className="flex flex-wrap gap-2">
                {modules.map((m) => { const on = sel.includes(m.code); return (
                  <button type="button" key={m.code} onClick={() => setSel(on ? sel.filter((x) => x !== m.code) : [...sel, m.code])} style={{ ["--mod" as string]: m.color }}
                    className={`rounded-full border px-4 py-2 font-mono text-sm transition-colors ${on ? "border-mod bg-mod text-graphite" : "border-border hover:border-mod"}`}>{m.code}</button>); })}
              </div>
            </div>
            <textarea rows={5} placeholder="What would you like to solve first?" className={field} />
            <button className="w-full rounded-full bg-primary py-4 font-medium text-primary-foreground transition-transform hover:scale-[1.01]">Book a demo</button>
          </form>
        )}
      </Reveal>
      <Reveal delay={0.1} className="space-y-6">
        {[["Platform walkthrough", "Explore application boundaries, AMS permissions, environment separation, integrations, monitoring and recovery requirements."], ["Technical discovery session", "Bring your IT team. Bring your operational requirements."], ["Start with one cube", "Usually MES, QMS or WMS — live in weeks."]].map(([t, d]) => (
          <div key={t} className="rounded-2xl border border-border p-6"><h3 className="text-xl">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
        ))}
      </Reveal>
    </section>
  </>);
}
