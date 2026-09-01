import { createTheme, type MantineColorsTuple } from "@mantine/core"

// Brand palette (https://coolors.co/ffffff-1f1f1f-fb9660-59c5cf): orange as
// the primary accent, cyan as the secondary — same order in light and dark.
// Shades generated from the two swatches via @mantine/colors-generator.
const orange: MantineColorsTuple = [
  "#fff0e3",
  "#ffe0cd",
  "#febf9d",
  "#fb9660",
  "#f97e3c",
  "#f96b1f",
  "#f9610f",
  "#de5003",
  "#c64600",
  "#ad3a00",
];

const cyan: MantineColorsTuple = [
  "#e1fdff",
  "#d3f4f7",
  "#aee5ea",
  "#85d5dd",
  "#59c5cf",
  "#4cc0cb",
  "#3bbdc8",
  "#28a6b1",
  "#12949f",
  "#00818b",
];

// Mantine's default `gray`/`dark` scales (used for borders, hover states,
// dimmed text, and light/dark surfaces) are neutral-cool. Hue-shifted here
// toward the brand orange's hue (~28°) at low saturation for a warmer,
// cozier neutral without changing the lightness steps components rely on.
const gray: MantineColorsTuple = [
  "#fbf9f7",
  "#f6f3f0",
  "#f1ece7",
  "#e9e2db",
  "#ded3ca",
  "#c4b4a6",
  "#a18d7b",
  "#5f4f41",
  "#46392e",
  "#2d241d",
];

const dark: MantineColorsTuple = [
  "#cac3bc",
  "#b2a89f",
  "#9f9287",
  "#6e6054",
  "#453b32",
  "#372f28",
  "#2e2822",
  "#201c18",
  "#191512",
  "#14110f",
];

/**
 * Site-wide theme overrides. Mantine's defaults are h3: 1.375rem, h4:
 * 1.125rem — bumped up a step so sub-headings read with more weight.
 */
export const theme = createTheme({
  white: "#fdfbf8",
  black: "#1f1a16",
  colors: {
    orange,
    cyan,
    gray,
    dark,
  },
  primaryColor: "orange",
  headings: {
    sizes: {
      h3: { fontSize: "1.625rem", lineHeight: "1.35" },
      h4: { fontSize: "1.25rem", lineHeight: "1.4" },
    },
  },
})
