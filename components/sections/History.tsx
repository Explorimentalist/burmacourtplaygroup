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
          Burma Court Playgroup has been a pillar of the local community for over 40 years. Families actively shape their children’s growth, turning play into a shared adventure. Together, parents and staff collaborate every day to nurture happy, confident kids.
          </p>
        </div>

        {/* Main Image - Full 12 columns */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-8 lg:mb-16">
          <div className="relative h-[400px] lg:h-[749px] w-full">
            <img
              src="/images/history/Burma-Court-2026-edtaylor.co.uk-6483.jpg"
              alt="Charming Victorian playgroup building exterior with brick facade and colorful children's area"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom Text - 4 columns starting from 6th column */}
        <div className="col-span-4 md:col-span-6 lg:col-start-6 lg:col-span-4">
          <p className="font-body text-14 lg:text-16 leading-21 text-neutral-600">
          This enduring history is built upon the strength of a community-run model, where generations of parents have taken on the responsibility of the Management Committee to decide on everything from staffing to finances. Operating from our long-standing home at the Mabel Thornton Community Hall, we continue to provide a high-quality start for children from all sections of the community, recently evidenced by our "Good" Ofsted grade in September 2024
          </p>
        </div>
      </Grid>
    </section>
  )
}