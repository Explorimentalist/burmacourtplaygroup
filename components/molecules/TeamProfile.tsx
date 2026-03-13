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
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="relative w-full aspect-square overflow-hidden group">
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
            className="w-full h-full object-cover transition-opacity duration-normal group-hover:opacity-0"
            loading="lazy"
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
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-normal group-hover:opacity-100"
              loading="lazy"
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
