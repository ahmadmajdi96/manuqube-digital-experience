import logo from "@/assets/manuqube-logo.png";
export function Logo({ className = "h-7" }: { className?: string }) {
  return <span className="inline-flex items-center gap-2"><img src={logo} alt="" className={`${className} w-auto`} /><span className="text-lg font-semibold text-foreground">Manuqube</span></span>;
}
