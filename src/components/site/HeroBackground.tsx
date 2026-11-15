const images = import.meta.glob<string>("/src/assets/heroes/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

export function heroImage(key: string): string | undefined {
  return images[`/src/assets/heroes/${key}.jpg`];
}

export function HeroBackground({ name }: { name: string }) {
  return <div className="hero-industrial-background" aria-hidden="true"><img src={heroImage(name)} alt="" decoding="async" /><div /></div>;
}