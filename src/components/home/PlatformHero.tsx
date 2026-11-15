import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Boxes, CalendarRange, ClipboardCheck, Database, Factory, FlaskConical, GitBranch, KeyRound, Network, PackageCheck, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { modules, type Module } from "@/data/modules";
import factoryFloor from "@/assets/manufacturing-floor.jpg";

const icons = { oms: PackageCheck, aps: CalendarRange, plms: GitBranch, ems: Settings2, rms: FlaskConical, mes: Factory, qms: ClipboardCheck, wms: Boxes, ams: KeyRound };
const upstream = ["oms", "aps", "plms", "ems", "rms"];
const downstream = ["mes", "qms", "wms", "ams"];

export function PlatformHero() {
  const [focused, setFocused] = useState<Module | undefined>();
  const reduceMotion = useReducedMotion();
  const renderModule = (slug: string) => {
    const module = modules.find((item) => item.slug === slug);
    if (!module) return null;
    const Icon = icons[slug as keyof typeof icons];
    return (
      <Button key={slug} asChild variant="ghost" className={`platform-module module-${slug}`}>
        <Link to="/modules/$slug" params={{ slug }} onMouseEnter={() => setFocused(module)} onMouseLeave={() => setFocused(undefined)} onFocus={() => setFocused(module)} onBlur={() => setFocused(undefined)}>
          <span className="platform-module-top"><span className="platform-module-icon"><Icon aria-hidden="true" /></span><span>{module.code}</span><ArrowUpRight className="platform-module-arrow" aria-hidden="true" /></span>
          <span className="platform-module-name">{module.name}</span>
        </Link>
      </Button>
    );
  };

  return (
    <section className="platform-hero" aria-labelledby="platform-hero-title">
      <div className="platform-industrial-scene" aria-hidden="true"><img src={factoryFloor} alt="" width={1920} height={1024} /><div /></div>
      <div className="container-x">
        <motion.div className="platform-hero-intro" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div>
            <p className="eyebrow flex items-center gap-3"><span className="h-2 w-2 bg-primary" />The Modular Manufacturing Operating System</p>
            <h1 id="platform-hero-title"><span className="platform-brand">ManuQube<span className="text-primary">.</span></span><span className="platform-headline">One operating system. <span className="platform-headline-end">The <span className="text-primary">entire factory.</span></span></span></h1>
          </div>
          <div className="platform-hero-copy">
            <p>Nine connected modules. One shared data model.<br />Start with one module. Grow into the whole factory.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-12"><Link to="/contact">Book a demo <ArrowUpRight /></Link></Button>
              <Button asChild variant="outline" size="lg" className="h-12"><Link to="/platform">Explore the platform <ArrowRight /></Link></Button>
            </div>
          </div>
        </motion.div>

        <motion.div className="platform-map" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} aria-label="Nine ManuQube modules connected by one shared data model and event backbone">
          <div className="platform-map-caption"><span className="eyebrow">The ManuQube ecosystem</span><span className="font-mono text-xs text-muted-foreground">ISA-95 / LEVEL 3</span></div>
          <div className="platform-node-row platform-upstream">{upstream.map(renderModule)}</div>
          <div className="platform-backbone">
            <span className="platform-signal" aria-hidden="true" />
            <div className="platform-backbone-label"><span className="platform-hub-icon"><Network aria-hidden="true" /></span><span>One shared backbone</span></div>
            <div className="platform-backbone-data"><span><Database aria-hidden="true" />Shared data model</span><span><GitBranch aria-hidden="true" />Signed events</span><span><ClipboardCheck aria-hidden="true" />Audit trail</span></div>
          </div>
          <div className="platform-node-row platform-downstream">{downstream.map(renderModule)}</div>
          <div className="platform-map-detail" aria-live="polite">
            <span className="font-mono text-xs text-primary">{focused ? focused.code : "CONNECTED BY DESIGN"}</span>
            <p>{focused ? focused.oneLiner : "Every module speaks the same language, shares the same master data, and exchanges the same signed events."}</p>
            <ArrowRight className="shrink-0 text-primary" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
      <div className="platform-hero-proof container-x"><span><strong>09</strong> connected modules</span><span><strong>01</strong> shared backbone</span><span>From raw lot to customer shipment <ArrowRight aria-hidden="true" /></span></div>
    </section>
  );
}