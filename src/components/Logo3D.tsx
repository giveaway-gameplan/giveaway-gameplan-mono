import type { CSSProperties } from 'react'

/** How thick the logo is, in pixels, and how many slices make up that thickness. */
const DEPTH = 6
const SLICES = 25

/** The size of the logo's artwork (public/logo_only.svg), which the walls are measured in. */
const ART = { width: 913, height: 888 }

/**
 * The outer edges of the gift box in the artwork: the lid, and the narrower
 * body under it. Each gets a solid wall so the box has real sides.
 */
const WALLS = [
  { x: 30, top: 272, bottom: 436 },
  { x: 894, top: 272, bottom: 436 },
  { x: 53, top: 441, bottom: 860 },
  { x: 871, top: 441, bottom: 860 },
]

const percent = (value: number, of: number) => `${(value / of) * 100}%`

/**
 * The gift-box logo as a slowly spinning 3D object. It is the flat logo cut
 * out of a stack of slices spaced along the depth axis: the two outer slices
 * are the gold faces and the darker ones between them read as its sides.
 * Slices are flat, so seen exactly side-on they would vanish; the walls along
 * the box's edges are what is seen then.
 * Styles and the animation are in globals.css (.logo-3d).
 */
const Logo3D = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={`logo-3d ${className ?? ''}`}
    style={{ '--logo-depth': `${DEPTH}px` } as CSSProperties}
  >
    <span className="logo-3d-spin">
      {Array.from({ length: SLICES }, (_, index) => {
        const isFace = index === 0 || index === SLICES - 1
        return (
          <span
            key={index}
            className={isFace ? 'logo-3d-slice logo-3d-face' : 'logo-3d-slice'}
            style={{ transform: `translateZ(${(index / (SLICES - 1) - 0.5) * DEPTH}px)` }}
          />
        )
      })}
      {WALLS.map(({ x, top, bottom }) => (
        <span
          key={`${x}-${top}`}
          className="logo-3d-wall"
          style={{
            left: percent(x, ART.width),
            top: percent(top, ART.height),
            height: percent(bottom - top, ART.height),
          }}
        />
      ))}
    </span>
  </span>
)

export default Logo3D
