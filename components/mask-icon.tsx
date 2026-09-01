import type { CSSProperties } from "react"

/** Renders an SVG file as a solid `currentColor` shape via CSS masking. */
export function MaskIcon({
  src,
  size = "1rem",
  className,
  style,
}: {
  src: string
  size?: string | number
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: "block",
        width: size,
        height: size,
        flexShrink: 0,
        backgroundColor: "currentColor",
        maskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
        ...style,
      }}
    />
  )
}
