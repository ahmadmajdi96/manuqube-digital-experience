import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { modules, crewPrinciple } from "@/data/modules";
import crew from "@/assets/crew-lineup.webp";
import { ClosingCta, PageHero } from "@/components/site/Blocks";
import { PersonaCard } from "@/components/site/PersonaCard";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/crew/")({
  head: () => ({
    meta: [
      { title: "The agent crew — ManuQube AI" },
      { name: "description", content: "Meet Operator, Dispatcher, Inspector, Sentinel, Formulator, Engineer, Steward, Planner and Quartermaster — the nine ManuQube characters." },
      { property: "og:title", content: "Meet the ManuQube agent crew" },
      { property: "og:description", content: "Nine characters that illustrate how the nine modules work together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CrewPage,
});

function CrewPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const s = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const o = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  return (
    <>
      <PageHero eyebrow="Manuqube AI / Agent crew" title={<>Nine modules. <span className="text-primary">Nine characters.</span></>} sub="Use the agent crew to illustrate how the nine modules work together. Each character has a personality, a voice and a clear decision boundary." />
      <div ref={ref} className="relative h-[70vh] overflow-hidden">
        <motion.img src={crew} style={{ scale: s, opacity: o }} alt="The nine ManuQube characters" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      <section className="container-x py-20">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <StaggerItem key={m.slug}>
              <PersonaCard m={m} />
              <div className="mt-4 px-1 text-sm text-muted-foreground" style={{ ["--mod" as string]: m.color }}>
                <span className="font-mono text-mod">{m.persona.temperament}</span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-20">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="eyebrow">Shared crew principle</div>
            <p className="mt-4 max-w-3xl text-2xl leading-snug md:text-3xl">{crewPrinciple}</p>
          </div>
        </Reveal>
      </section>
      <ClosingCta />
    </>
  );
}
