import logo from "@/assets/logo.png";
export function Logo({ className = "h-7" }: { className?: string }) {
  return <img src={logo} alt="ManuQube AI" className={`${className} w-auto`} />;
}
