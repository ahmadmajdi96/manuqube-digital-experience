import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { heroImage } from "./HeroBackground";
import { modules } from "@/data/modules";

export function PageHero({ eyebrow, title, sub, children, image, position, tone = "neutral" }: { eyebrow: string; title: ReactNode; sub?: string; children?: ReactNode; image?: string; position?: string; tone?: "neutral" | "warm" | "cool" | "deep" }) {
  const isCrew = eyebrow.includes("Agent crew");
  const key = isCrew ? "crew" : /Technology/.test(eyebrow) ? "technology" : /Security/.test(eyebrow) ? "security" : /Connected/.test(eyebrow) ? "connected" : /Platform/.test(eyebrow) ? "platform" : /Why/.test(eyebrow) ? "industries" : /About/.test(eyebrow) ? "about" : /FAQ/.test(eyebrow) ? "faq" : "contact";
  const src = image ?? heroImage(key);
  return (
    <section className={`industrial-page-hero ${isCrew ? "industrial-page-hero-crew" : ""}`} data-tone={tone}>
      <img className="industrial-cover" src={src} alt="" width={640} height={480} />
      <div className="industrial-cover-shade" aria-hidden="true" />
      <div className="container-x industrial-page-content">
        <Reveal><div className="eyebrow flex items-center gap-3"><span className="industrial-index" aria-hidden="true">MQ /</span>{eyebrow}</div></Reveal>
        <Reveal delay={0.05}><h1 className="text-balance">{title}</h1></Reveal>
        {sub && <Reveal delay={0.1}><p className="industrial-page-sub">{sub}</p></Reveal>}
        {children && <Reveal delay={0.15}><div className="mt-10">{children}</div></Reveal>}
      </div>
      <div className="industrial-page-rail"><div className="container-x"><span className="font-mono">ManuQube <span className="text-primary">/</span> MOM</span><div>{modules.map((m) => <Link key={m.slug} to="/modules/$slug" params={{ slug: m.slug }} className={`module-${m.slug}`}><span />{m.code}</Link>)}</div><span className="font-mono">ISA-95 · LEVEL 3</span></div></div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, className = "" }: { eyebrow: string; title: ReactNode; sub?: string; className?: string }) {
  return (
    <Reveal className={className}>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="text-balance mt-4 max-w-3xl text-4xl leading-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}

export function PrimaryCta({ to, children }: { to: "/contact" | "/modules" | "/technology" | "/crew" | "/connected"; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
      {children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
export function GhostCta({ to, children }: { to: "/contact" | "/modules" | "/technology" | "/crew" | "/connected" | "/platform"; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 font-medium transition-colors hover:bg-accent">
      {children}
    </Link>
  );
}

export function ClosingCta({ title = "Build your factory's operating system one cube at a time.", text = "Deploy the module you need most today. Every module you add later plugs into the same backbone — no re-integration, no duplicated data.", button = "Talk to a manufacturing expert" }: { title?: string; text?: string; button?: string }) {
  return (
    <section className="container-x py-24">
      <Reveal>
        <div className="grain relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="absolute -right-20 -top-20 h-80 w-80 rotate-12 rounded-[3rem] border-[3rem] border-primary-foreground/10" />
          <div className="absolute -bottom-24 right-40 h-56 w-56 rotate-45 rounded-[2rem] border-[2rem] border-primary-foreground/10" />
          <h2 className="text-balance relative max-w-3xl text-4xl leading-tight md:text-6xl">{title}</h2>
          <p className="relative mt-6 max-w-xl text-lg opacity-85">{text}</p>
          <Link to="/contact" className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-graphite px-6 py-3.5 font-medium text-ivory transition-transform hover:scale-[1.03]">
            {button} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export function StatePill({ state, children }: { state: "hold" | "review" | "approved" | "info"; children: ReactNode }) {
  const cls = { hold: "bg-hold", review: "bg-review", approved: "bg-approved", info: "bg-info" }[state];
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] text-ivory ${cls}`}><span className="h-1.5 w-1.5 rounded-full bg-ivory" />{children}</span>;
}
