import { createTheme, type MantineColorsTuple } from "@mantine/core"

// Light mode: pale-sage ground with a pine-green accent (Palette 4 — "Slate
// green", https://coolors.co/cad2c5-84a98c-52796f-354f52-2f3e46). Dark mode
// ("brown mode") instead grounds on the site's Brown University brown, so the
// header bar and the page it sits on read as one consistent brand, with a
// yellow accent for CTAs (see the `dark` tuple, and the primary-color
// override in globals.css) — swapped from the light mode's BAIST red.
//
//   cad2c5 sage · 84a98c green · 52796f pine · 354f52 slate · 2f3e46 spruce

// Pine accent ramp, generated around #52796f, its deepest steps pulled toward
// the palette's slate/spruce. Mostly superseded now: both light mode (BAIST
// red) and dark mode (white, yellow on hover) override the filled primary
// color in globals.css rather than using this ramp directly.
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
// off neutral toward the brown hue so it sits with the warm ground and the
// Brown-brown body text.
const gray: MantineColorsTuple = [
  "#f7f5f1",
  "#f1ece5",
  "#e6ded4",
  "#d6cabb",
  "#bdae9c",
  "#9a8b78", // dimmed text
  "#7a6c5b",
  "#5b5044", // muted text (subheadings)
  "#42392f",
  "#332c24",
];

// Mantine's `dark` tuple runs light -> dark: [0] is the lightest (primary text
// on a dark surface), [9] the darkest. Warm brown, keyed off the site's Brown
// University brown (#4e3629) — the same colour as the light-mode nav bar —
// so "dark mode" reads as the brown theme rather than an unrelated palette.
// Reuses the darker steps of the `brown` accent tuple below for [7]/[8].
const dark: MantineColorsTuple = [
  "#efe9e4", // dark-mode primary text
  "#ddd2c8",
  "#c2b0a0", // dark-mode dimmed text
  "#a68f7a",
  "#7c6552", // dark-mode borders
  "#5c4735", // dark-mode hover
  "#4e3629", // dark-mode surface — the site's Brown brown
  "#3e2b20", // dark-mode body background
  "#2f2018",
  "#231710",
];

// Brown accent ramp keyed off the site's Brown University brown (#4E3629) —
// the same colour as the nav bar and body text — so the calendar's brown
// chips and pinned-board backdrop match the rest of the site exactly. The
// nav bar brown doesn't shift between light/dark mode, so both the light- and
// dark-mode filled shades below are pinned to that same value too.
const brown: MantineColorsTuple = [
  "#f6f0ec",
  "#e6dcd3",
  "#d3b9a7",
  "#bd9478",
  "#4e3629", // dark-mode filled — same brown, not lightened
  "#6d4a35",
  "#5c3f2c", // base swatch
  "#4e3629", // light-mode filled — Brown University brown, matches the site
  "#3e2b20",
  "#2f2018",
];

// Overrides Mantine's default (brighter, more orange) "red" so calendar chips
// sit in the BAIST red family (#C00404 — the same red swapped in for "pine" in
// light mode below) rather than the stock palette. The filled shades are pinned
// one step *darker* than the brand red: chips are small blocks of saturated
// colour repeated down the calendar, and the full-strength red is harsh at that
// density. Like brown, light and dark mode share the one filled value.
const red: MantineColorsTuple = [
  "#fdeceb",
  "#f9d0cd",
  "#f0a29b",
  "#e6746a",
  "#8f0303", // dark-mode filled — same deepened red, not lightened
  "#a80404",
  "#c00404", // base swatch — the brand red itself
  "#8f0303", // light-mode filled — brand red, one step darker for chips
  "#5c0202",
  "#420101",
];

// Overrides Mantine's default "yellow" for the calendar's audience chips. The
// brand yellow (#FFC72C) is a highlight colour, far too bright to carry white
// label text as a filled chip, so the ramp runs down to a deep gold at the
// filled shades — same reasoning as the deepened `red` above.
const yellow: MantineColorsTuple = [
  "#fdf6e3",
  "#f8e9bf",
  "#eed48a",
  "#dcb954",
  "#8d6710", // dark-mode filled — same deep gold, not lightened
  "#a87c1a",
  "#96700f", // base swatch
  "#8d6710", // light-mode filled — deep gold, readable under white text
  "#6e5009",
  "#4f3906",
];

/**
 * Site-wide theme overrides. Mantine's defaults are h3: 1.375rem, h4:
 * 1.125rem — bumped up a step so sub-headings read with more weight.
 */
export const theme = createTheme({
  // Barely-there warm tint (halfway from #f7f4ee to white) + Brown University
  // brown (#4E3629) for body text in light mode; dark mode keeps the cool
  // slate ramp below.
  white: "#fbfaf7",
  black: "#4e3629",
  colors: {
    pine,
    gray,
    dark,
    brown,
    red,
    yellow,
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
