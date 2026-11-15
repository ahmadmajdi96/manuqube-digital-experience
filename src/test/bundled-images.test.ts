import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { modules } from "@/data/modules";

describe("Self-hosted website images", () => {
  it("bundles all nine persona portraits instead of relying on the Lovable image proxy", () => {
    expect(modules).toHaveLength(9);
    for (const module of modules) {
      expect(module.image).not.toContain("/__l5e/");
      const portrait = resolve(`src/assets/crew/${module.slug}.webp`);
      expect(existsSync(portrait)).toBe(true);
      expect(readFileSync(portrait).subarray(0, 4).toString()).toBe("RIFF");
    }
  });
  it("includes the brand, crew lineup and manufacturing photographs in the repository", () => {
    for (const image of ["logo.png", "emblem.png", "crew-lineup.webp", "manufacturing-floor.jpg", "process-engineering.jpg"]) {
      expect(readFileSync(resolve("src/assets", image)).length).toBeGreaterThan(1000);
    }
  });
});