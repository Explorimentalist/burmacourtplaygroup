import { useRef, useState } from 'react'
import type { CSSProperties, PointerEvent } from 'react'

interface TeamProfileProps {
  imageBase: string
  hoverImageBase?: string
  name: string
  role: string
  description: string
  showDescription?: boolean
  className?: string
}

const buildSrcSet = (base: string, ext: 'avif' | 'webp' | 'jpg') => {
  return `/images/team/${base}-512.${ext} 512w, /images/team/${base}-1024.${ext} 1024w`
}

const imageSizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'

export default function TeamProfile({
  imageBase,
  hoverImageBase,
  name,
  role,
  description,
  showDescription = false,
  className = ''
}: TeamProfileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [spotActive, setSpotActive] = useState(false)

  const updateSpot = (event: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    containerRef.current.style.setProperty('--spot-x', `${x}%`)
    containerRef.current.style.setProperty('--spot-y', `${y}%`)
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full aspect-square overflow-hidden group"
        data-spot-active={spotActive}
        onPointerEnter={(event) => {
          setSpotActive(true)
          updateSpot(event)
        }}
        onPointerMove={updateSpot}
        onPointerLeave={() => setSpotActive(false)}
        onPointerDown={(event) => {
          setSpotActive(true)
          updateSpot(event)
        }}
        onPointerUp={() => setSpotActive(false)}
        onPointerCancel={() => setSpotActive(false)}
        style={{
          '--spot-x': '50%',
          '--spot-y': '50%',
          '--spot-size': '80px'
        } as CSSProperties}
      >
        <picture>
          <source
            type="image/avif"
            srcSet={buildSrcSet(imageBase, 'avif')}
            sizes={imageSizes}
          />
          <source
            type="image/webp"
            srcSet={buildSrcSet(imageBase, 'webp')}
            sizes={imageSizes}
          />
          <img
            src={`/images/team/${imageBase}-512.jpg`}
            srcSet={buildSrcSet(imageBase, 'jpg')}
            sizes={imageSizes}
            alt={`${name} - ${role}`}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </picture>

        {hoverImageBase && (
          <picture>
            <source
              type="image/avif"
              srcSet={buildSrcSet(hoverImageBase, 'avif')}
              sizes={imageSizes}
            />
            <source
              type="image/webp"
              srcSet={buildSrcSet(hoverImageBase, 'webp')}
              sizes={imageSizes}
            />
            <img
              src={`/images/team/${hoverImageBase}-512.jpg`}
              srcSet={buildSrcSet(hoverImageBase, 'jpg')}
              sizes={imageSizes}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-fast pointer-events-none group-data-[spot-active=true]:opacity-100"
              style={{
                WebkitMaskImage:
                  'radial-gradient(circle var(--spot-size) at var(--spot-x) var(--spot-y), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)',
                maskImage:
                  'radial-gradient(circle var(--spot-size) at var(--spot-x) var(--spot-y), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
              }}
              loading="lazy"
              draggable={false}
            />
          </picture>
        )}
      </div>
      
      <div className="flex flex-col w-3/4 lg:w-3/4">
        <h3 className="font-body text-24 font-semibold leading-31 text-neutral-800 mb-3">
          {name}
        </h3>
        <p className="font-body text-16 font-medium leading-21 text-neutral-600 mb-5">
          {role}
        </p>
        {showDescription && description && (
          <p className="font-body text-16 font-regular leading-21 text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
