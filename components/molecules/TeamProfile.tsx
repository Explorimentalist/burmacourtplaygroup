interface TeamProfileProps {
  imageUrl: string
  name: string
  role: string
  description: string
  className?: string
}

export default function TeamProfile({ imageUrl, name, role, description, className = '' }: TeamProfileProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div className="w-full aspect-square">
        <img
          src={imageUrl}
          alt={`${name} - ${role}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col w-3/4 lg:w-3/4">
        <h3 className="font-body text-24 font-semibold leading-31 text-neutral-800 mb-3">
          {name}
        </h3>
        <p className="font-body text-16 font-medium leading-21 text-neutral-600 mb-5">
          {role}
        </p>
        <p className="font-body text-16 font-regular leading-21 text-neutral-600">
          {description}
        </p>
      </div>
    </div>
  )
}