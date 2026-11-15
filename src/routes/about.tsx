import { createFileRoute } from "@tanstack/react-router";
import { ClosingCta, PageHero, SectionHead } from "@/components/site/Blocks";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Manuqube — a factory is one system" },
      { name: "description", content: "ManuQube was built on a simple idea: a factory is one system, so its software should be too. Here is how getting started works." },
      { property: "og:title", content: "About Manuqube — a factory is one system" },
      { property: "og:description", content: "ManuQube was built on a simple idea: a factory is one system, so its software should be too. Here is how getting started works." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: P,
});
const steps = [["Discover", "We map your current processes, systems and pain points against the ISA-95 Level 3 model."], ["Start with one cube", "Choose the module with the fastest return: usually MES, QMS or WMS."], ["Connect", "Link ERP, machines and existing tools through the ManuQube integration layer and edge gateway."], ["Go live", "Guided go-live checklist, role setup, training and on-site support."], ["Expand", "Add modules one at a time; each new cube uses the same data and sign-in from day one."]];
function P() {
  return (<>
    <PageHero eyebrow="About ManuQube" title={<>A factory is one system. <span className="text-primary">Its software should be too.</span></>} sub="Each module is a cube — complete on its own, stronger together. Together they form a Manufacturing Operating System that gives every person in the plant the same truth, at the same moment." />
    <section className="container-x pb-24"><Reveal><div className="rounded-3xl border border-border bg-card p-10 md:p-16"><div className="eyebrow">Mission</div><p className="text-balance mt-6 text-3xl leading-tight md:text-5xl">Make world-class manufacturing operations software modular, connected and accessible to every manufacturer.</p></div></Reveal></section>
    <section className="container-x pb-12"><SectionHead eyebrow="How it works" title="Getting started, one cube at a time." />
      <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">{steps.map(([t, d], k) => (
        <StaggerItem key={t} className="bg-background p-7"><div className="font-mono text-5xl text-primary/40">{k + 1}</div><h3 className="mt-8 text-xl">{t}</h3><p className="mt-3 text-sm text-muted-foreground">{d}</p></StaggerItem>))}</Stagger>
    </section>
    <ClosingCta />
  </>);
}
