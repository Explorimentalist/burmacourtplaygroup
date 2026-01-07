import Grid from '../atoms/Grid'

interface HistoryProps {
  className?: string
}

export default function History({ className = '' }: HistoryProps) {
  return (
    <section className={`bg-neutral-200 py-20 ${className}`}>
      <Grid className=" gap-y-0">
        {/* History Title - Centered */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex justify-center mb-8 lg:mb-16">
          <h2 className="font-display text-36 lg:text-[64px] leading-40 lg:leading-[38px] text-neutral-800 text-center">
            History
          </h2>
        </div>

        {/* Description Text - 6 middle columns on desktop, left aligned */}
        <div className="col-span-4 md:col-span-8 lg:col-start-4 lg:col-span-6 mb-8 lg:mb-16">
          <p className="font-body text-18 lg:text-24 font-light leading-26 lg:leading-31 text-neutral-600 text-left">
            We provide care and education for children from the age of two to five years old between. We emulate the experience of going to a friend&apos;s home for a play date in an intimate building off Green Lanes.
          </p>
        </div>

        {/* Main Image - Full 12 columns */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-8 lg:mb-16">
          <div className="relative h-[400px] lg:h-[749px] w-full">
            <img
              src="/images/history/entrance.png"
              alt="Charming Victorian playgroup building exterior with brick facade and colorful children's area"
              className="w-full h-full object-cover brand-rotation"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom Text - 4 columns starting from 6th column */}
        <div className="col-span-4 md:col-span-6 lg:col-start-6 lg:col-span-4">
          <p className="font-body text-14 lg:text-16 leading-21 text-neutral-600">
            We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend&apos;s home for a play date. Small, friendly and fun!
          </p>
        </div>
      </Grid>
    </section>
  )
}