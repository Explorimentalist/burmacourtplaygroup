import Grid from '../atoms/Grid'
import TeamProfile from '../molecules/TeamProfile'

interface TeamProps {
  className?: string
}

const teamMembers = [
  {
    id: 1,
    name: "Leigh",
    role: "Lead Early Years Educator",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "/images/team/Leigh.png",
  },
  {
    id: 2,
    name: "Lisa",
    role: "Creative Arts Specialist",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "/images/team/Lisa.png",
  },
  {
    id: 3,
    name: "Laura",
    role: "Outdoor Learning Coordinator",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "/images/team/Laura.png",
  },
  {
    id: 4,
    name: "David Martinez",
    role: "SEND Support Teacher",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 5,
    name: "Lucy Thompson",
    role: "Music & Movement Teacher",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Forest School Leader",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 7,
    name: "Sophie Brown",
    role: "Early Years Practitioner",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    id: 8,
    name: "Oliver Davis",
    role: "Child Development Specialist",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 9,
    name: "Hannah Taylor",
    role: "Family Liaison Officer",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 10,
    name: "Robert Anderson",
    role: "Health & Safety Coordinator",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 11,
    name: "Grace Mitchell",
    role: "Nutritionist",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
  },
  {
    id: 12,
    name: "Thomas Clark",
    role: "Administrative Manager",
    description: "We provide care and education for children from the age of two to five years old. Sandbrook Community Playgroup is located in a Stoke Newington Victorian House – we emulate the experience of going to a friend's home for a play date. Small, friendly and fun!",
    imageUrl: "https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=644&q=80"
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
              imageUrl={member.imageUrl}
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