type Props = {
  direction?: 'right' | 'up-right'
}

const PATHS = {
  right: 'M1.5 8H14M9 3L14 8L9 13',
  'up-right': 'M3.5 12.5L12.5 3.5M5.5 3.5H12.5V10.5',
}

/**
 * Seta dos CTAs (DEC-029). Traço reto de ponta aberta; tamanho = font-size (1em) e cor = currentColor
 * do span que a envolve, que continua dono do hover.
 */
export function Arrow({ direction = 'right' }: Props) {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" focusable="false">
      <path d={PATHS[direction]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  )
}
