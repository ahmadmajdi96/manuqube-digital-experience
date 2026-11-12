import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { modules } from "@/data/modules";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="h-7" />
          <p className="mt-4 max-w-sm text-muted-foreground">ManuQube — The Manufacturing Operating System.</p>
        </div>
        <div>
          <div className="eyebrow mb-4">Modules</div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {modules.map((m) => (
              <li key={m.slug}><Link to="/modules/$slug" params={{ slug: m.slug }} className="text-muted-foreground hover:text-foreground">{m.code}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">Company</Link></li>
            <li><Link to="/platform" className="hover:text-foreground">Platform</Link></li>
            <li><Link to="/technology" className="hover:text-foreground">Technology & Infrastructure</Link></li>
            <li><Link to="/industries" className="hover:text-foreground">Industries</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact · Book a demo</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x select-none pb-6 text-[18vw] font-bold leading-none tracking-tighter text-foreground/[0.04]">ManuQube</div>
      <div className="container-x flex flex-wrap justify-between gap-4 border-t border-border py-6 font-mono text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} ManuQube AI</span>
        <span>MES · OMS · QMS · EMS · RMS · PLMS · AMS · APS · WMS</span>
      </div>
    </footer>
  );
}
