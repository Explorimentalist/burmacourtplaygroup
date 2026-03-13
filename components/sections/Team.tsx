import Grid from '../atoms/Grid'
import TeamProfile from '../molecules/TeamProfile'

interface TeamProps {
  className?: string
}

const teamMembers = [
  {
    id: 1,
    name: "Laura",
    role: "Playgroup Assistant",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageBase: "Laura",
    hoverImageBase: "Laura_hover",
  },
  {
    id: 2,
    name: "Leigh",
    role: "Playgroup Manager",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageBase: "Leigh",
    hoverImageBase: "Leigh_hover",
  },
  {
    id: 3,
    name: "Lisa",
    role: "Deputy Manager",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageBase: "Lisa",
    hoverImageBase: "Lisa_hover",
  }
]

export default function Team({ className = '' }: TeamProps) {
  return (
    <section className={`bg-neutral-200 py-20 ${className}`}>
      <Grid className="gap-y-12">
        {/* Team Title - left aligned */}
        <div className="col-span-4 md:col-span-8 lg:col-span-12 flex justify-start mb-4 lg:mb-8">
          <h2 className="font-display text-36 lg:text-[64px] leading-40 lg:leading-[38px] text-neutral-800 text-left">
            Our Team
          </h2>
        </div>

        {/* Team Profiles Grid */}
        {teamMembers.slice(0, 3).map((member) => (
          <div key={member.id} className="col-span-4 md:col-span-4 lg:col-span-4">
            <TeamProfile
              imageBase={member.imageBase}
              hoverImageBase={member.hoverImageBase}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          </div>
        ))}
      </Grid>
    </section>
  )
}
