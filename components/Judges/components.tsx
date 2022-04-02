import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProfileProps {
  /** Profile picture of the judge. */
  image: string
  /** Name of the judge. */
  name: string
  /** Role/title of the judge. */
  role: string
}

/** Individual profile for each team lead. */
export const JudgeProfile = ({ image, name, role }: ProfileProps) => (
  <div className='flex flex-col w-full max-w-[8rem] md:max-w-[9rem] items-center'>
    <motion.span whileHover={{ y: -4 }}>
      <Image
        src={image}
        width={150}
        height={150}
        objectFit='contain'
        priority={true}
        quality={100}
        className="rounded-full"
      />
    </motion.span>
    <p className='mb-0 w-max font-semibold'>{name}</p>
    <p className='mt-0 leading-4 text-base text-center'>{role}</p>
  </div>
)

const judges = [
  {
    image: '/assets/judges/elmer-thomas.jpg',
    name: 'Elmer Thomas',
    role: 'Developer Educator @ Twilio',
  },
  {
    image: '/assets/judges/paea-lependu.jpg',
    name: 'Dr. Paea Le Pendu',
    role: 'UCR Professor',
  },
  {
    image: '/assets/judges/craig-schroeder.jpg',
    name: 'Dr. Craig Schroeder',
    role: 'UCR Professor',
  },
  {
    image: '/assets/judges/fuad-jamour.jpg',
    name: 'Dr. Fuad Jamour',
    role: 'UCR Professor',
  },
  {
    image: '/assets/judges/jed-schwendiman.jpg',
    name: 'Jed Schwendiman',
    role: 'Assistant Dean for Development',
  },
  {
    image: '/assets/judges/jia-chen.jpg',
    name: 'Jia Chen',
    role: 'Assistant Teaching Professor @ UCR',
  },
  {
    image: '/assets/judges/allan-knight.jpg',
    name: 'Allan Knight',
    role: 'Assistant Teaching Professor @ UCR',
  },
  {
    image: '/assets/logo.svg',
    name: 'Miguel Gutierrez',
    role: 'PhD Candidate @ UCR',
  },
  {
    image: '/assets/judges/cristina-lawson.jpg',
    name: 'Cristina Lawson',
    role: 'CS Master\'s Student @ UCR',
  },
  {
    image: '/assets/judges/diane-shan.jpg',
    name: 'Diane Shan',
    role: 'BCOE LC Treasurer',
  },
  {
    image: '/assets/judges/jonathan-trinh.jpg',
    name: 'Jonathan Trinh',
    role: 'Graduate @ UCI',
  },
  {
    image: '/assets/judges/chloe-georgiou.jpg',
    name: 'Chloe Georgiou',
    role: 'IEEE Vice President',
  },
  {
    image: '/assets/judges/minsoo-kim.jpg',
    name: 'Minsoo Kim',
    role: 'Cyber@UCR Treasurer',
  },
  {
    image: '/assets/judges/siddharta-dutta.jpg',
    name: 'Siddharta Dutta',
    role: 'Cyber@UCR Outreach Director',
  },
  {
    image: '/assets/judges/charles-hong.jpg',
    name: 'Charles Hong',
    role: 'Competitive Programming Chair',
  },
  {
    image: '/assets/judges/elaine-lin.jpg',
    name: 'Elaine Lin',
    role: 'Design@UCR Communications Director',
  },
  {
    image: '/assets/judges/mitha-senthilkumar.jpg',
    name: 'Mitha Senthilkumar',
    role: 'VEXU Lead at SWE@UCR',
  },
  {
    image: '/assets/judges/tim-jenkins.jpg',
    name: 'Tim Jenkins',
    role: 'Founder @ Table Needs',
  },
  {
    image: '/assets/judges/elise-lin.jpg',
    name: 'Elise Lin',
    role: 'Penetration Test @ Accenture',
  },
  {
    image: '/assets/judges/katie-fukuda.jpg',
    name: 'Katie Fukuda',
    role: 'SDE @ Amazon',
  },
  {
    image: '/assets/judges/danial-beg.jpg',
    name: 'Danial Beg',
    role: 'SWE @ BAE Systems',
  },
  {
    image: '/assets/judges/kanin-liang.jpg',
    name: 'Kanin Liang',
    role: 'Incoming SWE Intern @ Disney Streaming',
  },
  {
    image: '/assets/judges/michael-odea.jpg',
    name: 'Michael O\'Dea',
    role: 'Former IEEE@UCR Chair',
  },
  {
    image: '/assets/judges/neo-marin.jpg',
    name: 'Neo Marin',
    role: 'Former IEEE@UCR Program Chair',
  },
  {
    image: '/assets/judges/sunny-zeng.jpg',
    name: 'Sunny Zeng',
    role: 'Former IEEE@UCR Program Chair',
  },
  {
    image: '/assets/judges/alex-chen.jpg',
    name: 'Alex Chen',
    role: 'Former IEEE@UCR Webmaster',
  },
  {
    image: '/assets/judges/roy-feng.jpg',
    name: 'Roy Feng',
    role: 'Former ACM@UCR President',
  },
  {
    image: '/assets/judges/jino-sirivatanarat.jpg',
    name: 'Jino Sirivatanarat',
    role: 'Former ACM@UCR Vice President',
  },
  {
    image: '/assets/judges/brandon-to.jpg',
    name: 'Brandon To',
    role: 'Former ACM@UCR Treasurer',
  },
  {
    image: '/assets/judges/aramis-masarati.jpg',
    name: 'Aramis Masarati',
    role: 'Former Cyber@UCR Treasurer',
  },
  {
    image: '/assets/judges/jason-lin.jpg',
    name: 'Jason Lin',
    role: 'Former Cyber@UCR Board Member',
  },
]

/** Grid of judge profiles. */
export const JudgeGrid = () => (
  <div className='flex flex-wrap justify-center gap-6 md:gap-12 md:gap-y-12'>
    { judges.map(({ image, name, role }) =>
      <JudgeProfile
        key={name}
        image={image}
        name={name}
        role={role}
      />
    )}
  </div>
)