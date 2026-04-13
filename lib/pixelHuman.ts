export type HairStyle = "short" | "messy" | "bun" | "long" | "cap" | "bald";
export type ShirtStyle = "plain" | "stripes" | "buttoned" | "hoodie";
export type PantsStyle = "long" | "shorts";

export type HumanSprite = {
  skin: string;
  skinShadow: string;
  hair: string;
  hairStyle: HairStyle;
  eye: string;
  shirt: string;
  shirtDark: string;
  shirtStyle: ShirtStyle;
  pants: string;
  pantsDark: string;
  pantsStyle: PantsStyle;
  shoes: string;
  hasGlasses: boolean;
  hasEarring: boolean;
  hasScarf: boolean;
  scarfColor: string;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SKIN_TONES: { base: string; shadow: string }[] = [
  { base: "#f5d0b0", shadow: "#c99874" },
  { base: "#eab892", shadow: "#bc8553" },
  { base: "#d9996b", shadow: "#9c6536" },
  { base: "#a66f3f", shadow: "#6b4121" },
  { base: "#7a4a26", shadow: "#4a2a12" },
  { base: "#ecc5a1", shadow: "#b68856" },
];

const HAIR_COLORS = [
  "#0a0a0a",
  "#261a10",
  "#4a2f1a",
  "#6b4423",
  "#a67444",
  "#d4a574",
  "#e8c78f",
  "#b71c1c",
  "#7a7a7a",
  "#ec407a",
  "#7c4dff",
  "#1e88e5",
  "#2e7d32",
];

const EYE_COLORS = ["#1c1109", "#1e4d7a", "#2e7d32", "#5e35b1", "#6b4423"];

const SHIRT_COLORS: { base: string; dark: string }[] = [
  { base: "#e53935", dark: "#9b1c1c" },
  { base: "#1e88e5", dark: "#0d47a1" },
  { base: "#43a047", dark: "#1b5e20" },
  { base: "#fdd835", dark: "#c9a900" },
  { base: "#8e24aa", dark: "#4a148c" },
  { base: "#fb8c00", dark: "#b84b00" },
  { base: "#00897b", dark: "#004d40" },
  { base: "#ec407a", dark: "#880e4f" },
  { base: "#546e7a", dark: "#263238" },
  { base: "#26a69a", dark: "#00695c" },
  { base: "#7e57c2", dark: "#311b92" },
  { base: "#f5f5f5", dark: "#b0b0b0" },
];

const PANTS_COLORS: { base: string; dark: string }[] = [
  { base: "#1565c0", dark: "#0d47a1" },
  { base: "#374151", dark: "#1f2937" },
  { base: "#4e342e", dark: "#2d1c18" },
  { base: "#37474f", dark: "#1c262c" },
  { base: "#6d4c41", dark: "#3e2723" },
  { base: "#212121", dark: "#0d0d0d" },
];

const SHOE_COLORS = ["#111111", "#3e2723", "#f5f5f5", "#9b1c1c", "#1a3966"];

const HAIR_STYLES: HairStyle[] = [
  "short",
  "short",
  "messy",
  "bun",
  "long",
  "cap",
  "bald",
];

const SHIRT_STYLES: ShirtStyle[] = [
  "plain",
  "plain",
  "stripes",
  "buttoned",
  "hoodie",
];

const PANTS_STYLES: PantsStyle[] = ["long", "long", "long", "shorts"];

export function generateHuman(seed: number): HumanSprite {
  const r = mulberry32(seed);
  const pick = <T>(arr: T[]): T => arr[Math.floor(r() * arr.length)];

  const skin = pick(SKIN_TONES);
  const shirtColor = pick(SHIRT_COLORS);
  const pantsColor = pick(PANTS_COLORS);
  const scarfColor = pick(SHIRT_COLORS).base;

  return {
    skin: skin.base,
    skinShadow: skin.shadow,
    hair: pick(HAIR_COLORS),
    hairStyle: pick(HAIR_STYLES),
    eye: pick(EYE_COLORS),
    shirt: shirtColor.base,
    shirtDark: shirtColor.dark,
    shirtStyle: pick(SHIRT_STYLES),
    pants: pantsColor.base,
    pantsDark: pantsColor.dark,
    pantsStyle: pick(PANTS_STYLES),
    shoes: pick(SHOE_COLORS),
    hasGlasses: r() < 0.3,
    hasEarring: r() < 0.2,
    hasScarf: r() < 0.2,
    scarfColor,
  };
}
