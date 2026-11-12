import logo from "@/assets/logo.png.asset.json";
export function Logo({ className = "h-7" }: { className?: string }) {
  return <img src={logo.url} alt="ManuQube AI" className={`${className} w-auto`} />;
}
