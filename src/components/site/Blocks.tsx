import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, sub, children }: { eyebrow: string; title: ReactNode; sub?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 opacity-60" />
      <div className="container-x relative">
        <Reveal><div className="eyebrow flex items-center gap-2"><span className="anim-pulse h-1.5 w-1.5 rounded-full bg-primary" />{eyebrow}</div></Reveal>
        <Reveal delay={0.05}><h1 className="text-balance mt-6 max-w-5xl text-5xl leading-[1.02] md:text-7xl">{title}</h1></Reveal>
        {sub && <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{sub}</p></Reveal>}
        {children && <Reveal delay={0.15}><div className="mt-10">{children}</div></Reveal>}
      </div>
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
