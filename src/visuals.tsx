import type { ImgHTMLAttributes } from 'react'
import { business } from './content'

const base = import.meta.env.BASE_URL

export function Logo({ reversed = false }: { reversed?: boolean }) {
  return (
    <img
      className="logo"
      src={base + 'brand/wattlebridge-' + (reversed ? 'reversed' : 'primary') + '.svg'}
      alt={business.name}
      width="340"
      height="95"
    />
  )
}

export function Arrow({ direction = 'right' }: { direction?: 'right' | 'down' | 'up' }) {
  const paths = {
    right: 'M3.5 10h12.75m-5-5 5 5-5 5',
    down: 'M10 3.5v12.75m-5-5 5 5 5-5',
    up: 'M10 16.5V3.75m-5 5 5-5 5 5',
  }
  return (
    <svg className="arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={paths[direction]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type PhotoProps = ImgHTMLAttributes<HTMLImageElement> & {
  name: string
  widths: readonly number[]
  sizes: string
}

export function Photo({ name, widths, sizes, ...props }: PhotoProps) {
  const variants = widths.map((width) => [base + 'images/' + name + '-' + width + '.webp', width] as const)
  return (
    <img
      src={variants[0][0]}
      srcSet={variants.map(([url, width]) => url + ' ' + width + 'w').join(', ')}
      sizes={sizes}
      decoding="async"
      {...props}
    />
  )
}

/** Two arrows inside a circle: one leaves as the next arrives on hover and focus. */
export function ButtonArrow() {
  return (
    <span className="button-icon" aria-hidden="true">
      <Arrow />
      <Arrow />
    </span>
  )
}
