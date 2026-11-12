import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { modules } from "@/data/modules";

const nav = [
  { to: "/platform", label: "Platform" },
  { to: "/modules", label: "Modules" },
  { to: "/crew", label: "Agent crew" },
  { to: "/connected", label: "Connected" },
  { to: "/technology", label: "Technology" },
  { to: "/industries", label: "Industries" },
  { to: "/security", label: "Security" },
  { to: "/about", label: "About" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link to="/" className="shrink-0" aria-label="ManuQube home"><Logo className="h-6" /></Link>
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setMega(false)}>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onMouseEnter={() => setMega(n.to === "/modules")}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
          <AnimatePresence>
            {mega && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="absolute left-1/2 top-16 w-[min(56rem,92vw)] -translate-x-1/2 rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-1">
                  {modules.map((m) => (
                    <Link key={m.slug} to="/modules/$slug" params={{ slug: m.slug }} onClick={() => setMega(false)}
                      className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent" style={{ ["--mod" as string]: m.color }}>
                      <img src={m.image} alt="" className="h-12 w-10 rounded-md object-cover" />
                      <div>
                        <div className="font-mono text-xs text-mod">{m.code}</div>
                        <div className="text-sm">{m.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden items-center gap-1 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex">
            Book a demo <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button className="rounded-full p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border bg-background lg:hidden">
            <div className="container-x flex flex-col py-4">
              {[...nav, { to: "/faq", label: "FAQ" }, { to: "/contact", label: "Book a demo" }].map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-3 text-lg">{n.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
