import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProfileProps {
  link: string,
  image: string,
  name: string,
  role: string,
}

export const TeamProfile = ({ link, image, name, role }: ProfileProps) => (
  <div className='flex flex-col w-full max-w-[8rem] md:max-w-[9rem] items-center'>
    <motion.span whileHover={{ y: -4 }} className='cursor-pointer'>
      <a target='_blank' rel='noreferrer noopener' href={link}>
        <Image
          src={image}
          width={120}
          height={120}
          objectFit='contain'
        />
      </a>
    </motion.span>
    <p className='mb-0 font-semibold'>{name}</p>
    <p className='mt-0 leading-4 text-base text-center'>{role}</p>
  </div>
)

const staff = [
  {
    link: 'https://www.linkedin.com/in/rajbirjohar/',
    image: '/assets/logo.svg',
    name: 'Audrey Kim',
    role: 'Director',
  },
  {
    link: 'https://www.linkedin.com/in/audrey-kim-696922168/',
    image: '/assets/logo.svg',
    name: 'Rajbir Johar',
    role: 'Director',
  },
  {
    link: 'https://www.linkedin.com/in/paulianle7/',
    image: '/assets/logo.svg',
    name: 'Paulian Le',
    role: 'Operations Lead',
  },
  {
    link: 'https://www.linkedin.com/in/westin-montano/',
    image: '/assets/logo.svg',
    name: 'Westin Montano',
    role: 'Operations Lead',
  },
  {
    link: 'https://www.linkedin.com/in/mariam-golwalla-74930949/',
    image: '/assets/logo.svg',
    name: 'Mariam Golwalla',
    role: 'Sponsorship Lead',
  },
  {
    link: 'https://www.linkedin.com/in/marshall-jones-0/',
    image: '/assets/logo.svg',
    name: 'Marshall Jones',
    role: 'Sponsorship Lead',
  },
  {
    link: 'https://www.linkedin.com/in/kimberlylac/',
    image: '/assets/logo.svg',
    name: 'Kimmy Lac',
    role: 'Marketing Lead',
  },
  {
    link: 'https://www.linkedin.com/in/henry-zheng00/',
    image: '/assets/logo.svg',
    name: 'Henry Zheng',
    role: 'Marketing Lead',
  },
  {
    link: 'https://www.linkedin.com/in/jspescasio/',
    image: '/assets/logo.svg',
    name: 'J.S. Pescasio',
    role: 'Web Dev Lead',
  },
  {
    link: 'https://www.linkedin.com/in/michellesspace/',
    image: '/assets/logo.svg',
    name: 'Michelle Kim',
    role: 'UX Design Lead',
  },
]

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