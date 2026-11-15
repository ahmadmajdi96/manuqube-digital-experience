import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { modules } from "@/data/modules";

function jpegWidth(file: string): number {
  const bytes = readFileSync(file);
  let offset = 2;
  while (offset + 8 < bytes.length) {
    if (bytes[offset] !== 0xff) throw new Error(`Invalid JPEG marker in ${file}`);
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return bytes.readUInt16BE(offset + 7);
    }
    if (length < 2) break;
    offset += 2 + length;
  }
  throw new Error(`Missing JPEG dimensions in ${file}`);
}

describe("Self-hosted website images", () => {
  it("keeps every page-opening background at desktop resolution, including the Modules override", () => {
    const directory = resolve("src/assets/heroes");
    const images = readdirSync(directory).filter((file) => file.endsWith(".jpg"));
    expect(images.length).toBeGreaterThan(0);
    for (const image of [...images.map((file) => resolve(directory, file)), resolve("src/assets/modules-grid.jpg")]) {
      expect(jpegWidth(image), image).toBeGreaterThanOrEqual(1920);
    }
  });
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