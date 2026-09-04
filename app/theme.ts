import { createTheme, type MantineColorsTuple } from "@mantine/core"

// Palette 4 — "Slate green" (https://coolors.co/cad2c5-84a98c-52796f-354f52-
// 2f3e46). Calm and grounded: pale-sage grounds in light mode, a deep-spruce
// ground in dark mode, and a pine-green accent. Body text stays near-neutral
// (soft green-white / green-near-black) — only the background and the accent
// carry the palette.
//
//   cad2c5 sage · 84a98c green · 52796f pine · 354f52 slate · 2f3e46 spruce

// Pine accent ramp, generated around #52796f, its deepest steps pulled toward
// the palette's slate/spruce. `primaryShade` uses a deep pine in light mode
// (readable on sage, white text on fills) and a brighter sage in dark mode.
const pine: MantineColorsTuple = [
  "#eef4f1",
  "#dde8e3",
  "#b8cec6",
  "#93b3a8",
  "#729a8e", // dark-mode filled
  "#5c8579",
  "#52796f", // base swatch
  "#436258", // light-mode filled
  "#354f52",
  "#2f3e46",
];

// Mantine's `gray` scale drives light surfaces, borders and dimmed text. Shifted
// off neutral toward the sage hue so the cool green ground stays consistent.
const gray: MantineColorsTuple = [
  "#f4f7f4",
  "#eef2ee",
  "#e3e9e3",
  "#d3dcd2",
  "#b9c5bd",
  "#8fa096", // dimmed text
  "#6c7d74",
  "#4f5d57",
  "#3a4540",
  "#2b332f",
];

// Mantine's `dark` tuple runs light -> dark: [0] is the lightest (primary text
// on a dark surface), [9] the darkest. Cool slate-green, keyed off #2f3e46.
const dark: MantineColorsTuple = [
  "#e8efec", // dark-mode primary text
  "#d5e0db",
  "#b1c3bc", // dark-mode dimmed text
  "#89a299",
  "#46585b", // dark-mode borders
  "#394a4d", // dark-mode hover
  "#33444a", // dark-mode surface
  "#2a373d", // dark-mode body background
  "#232e33",
  "#1c252a",
];

/**
 * Site-wide theme overrides. Mantine's defaults are h3: 1.375rem, h4:
 * 1.125rem — bumped up a step so sub-headings read with more weight.
 */
export const theme = createTheme({
  white: "#f4f7f4",
  black: "#26302e",
  colors: {
    pine,
    gray,
    dark,
  },
  primaryColor: "pine",
  primaryShade: { light: 7, dark: 4 },
  headings: {
    sizes: {
      h3: { fontSize: "1.625rem", lineHeight: "1.35" },
      h4: { fontSize: "1.25rem", lineHeight: "1.4" },
    },
  },
})
