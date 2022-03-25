import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProfileProps {
  /** Link to the lead's LinkedIn profile. */
  link: string
  /** Profile picture of the lead. */
  image: string
  /** Name of the lead. */
  name: string
  /** Role/title of the lead. */
  role: string
}

/** Individual profile for each team lead. */
export const TeamProfile = ({ link, image, name, role }: ProfileProps) => (
  <div className='flex flex-col w-full max-w-[8rem] md:max-w-[9rem] items-center'>
    <motion.span whileHover={{ y: -4 }} className='cursor-pointer'>
      <a target='_blank' rel='noreferrer noopener' href={link}>
        <Image
          src={image}
          width={120}
          height={120}
          objectFit='contain'
          priority={true}
          quality={100}
          className="rounded-full"
        />
      </a>
    </motion.span>
    <p className='mb-0 w-max font-semibold'>{name}</p>
    <p className='mt-0 leading-4 text-base text-center'>{role}</p>
  </div>
)

const staff = [
  {
    link: 'https://www.linkedin.com/in/audrey-kim-696922168/',
    image: '/assets/leads/audrey.jpeg',
    name: 'Audrey Kim',
    role: 'Director',
  },
  {
    link: 'https://www.linkedin.com/in/rajbirjohar/',
    image: '/assets/leads/rajbir.jpeg',
    name: 'Rajbir Johar',
    role: 'Director',
  },
  {
    link: 'https://www.linkedin.com/in/paulianle7/',
    image: '/assets/leads/paulian.jpg',
    name: 'Paulian Le',
    role: 'Operations Lead',
  },
  {
    link: 'https://www.linkedin.com/in/westin-montano/',
    image: '/assets/leads/westin.jpeg',
    name: 'Westin Montano',
    role: 'Operations Lead',
  },
  {
    link: 'https://www.linkedin.com/in/mariam-golwalla-74930949/',
    image: '/assets/leads/mariam.jpeg',
    name: 'Mariam Golwalla',
    role: 'Sponsorship Lead',
  },
  {
    link: 'https://www.linkedin.com/in/marshall-jones-0/',
    image: '/assets/leads/marshall.jpeg',
    name: 'Marshall Jones',
    role: 'Sponsorship Lead',
  },
  {
    link: 'https://www.linkedin.com/in/kimberlylac/',
    image: '/assets/leads/kimmy.jpeg',
    name: 'Kimmy Lac',
    role: 'Marketing Lead',
  },
  {
    link: 'https://www.linkedin.com/in/henry-zheng00/',
    image: '/assets/leads/henry.jpeg',
    name: 'Henry Zheng',
    role: 'Marketing Lead',
  },
  {
    link: 'https://www.linkedin.com/in/jspescasio/',
    image: '/assets/leads/jamella.jpeg',
    name: 'J.S. Pescasio',
    role: 'Web Dev Lead',
  },
  {
    link: 'https://www.linkedin.com/in/michellesspace/',
    image: '/assets/leads/michelle.jpeg',
    name: 'Michelle Kim',
    role: 'UX Design Lead',
  },
  {
    link: 'https://www.linkedin.com/in/abhivishwas/',
    image: '/assets/leads/abhi.jpeg',
    name: 'Abhi Vishwasrao',
    role: 'Volunteer Lead',
  },
  {
    link: 'https://www.linkedin.com/in/jakin200/',
    image: '/assets/leads/jakin.jpeg',
    name: 'Jakin Chan',
    role: 'Volunteer Lead',
  },
]

/** Grid of team lead profiles. */
export const TeamGrid = () => (
  <div className='flex flex-wrap justify-center gap-6 md:gap-12 md:gap-y-12'>
    { staff.map(({ link, image, name, role }) =>
      <TeamProfile
        key={link}
        link={link}
        image={image}
        name={name}
        role={role}
      />
    )}
  </div>
)