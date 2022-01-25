import { motion } from 'framer-motion'
import { 
  FiMail,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
} from 'react-icons/fi'

export function Footer() {
  const socials = [
    {
      icon: <FiMail title='Email' />,
      link: 'mailto:citrushack@gmail.com',
    },
    {
      icon: <FiFacebook title='Facebook' />,
      link: 'https://www.facebook.com/CitrusHack',
    },
    {
      icon: <FiInstagram title='Instagram' />,
      link: 'https://www.instagram.com/citrushack_ucr',
    },
    {
      icon: <FiTwitter title='Twitter' />,
      link: 'https://twitter.com/citrushack',
    },
    {
      icon: <FiLinkedin title='LinkedIn' />,
      link: 'https://www.linkedin.com/company/citrus-hack',
    },
  ]
  return (
    <footer className='flex justify-center w-full py-12 bg-gray-200'>
      <div className='flex flex-col gap-4 items-center w-full mx-4 text-md font-semibold'>
        <div className='flex gap-2.5 text-2xl'>
          { socials.map(({ icon, link }) =>
            <a key={link} target='_blank' rel='noreferrer noopener' href={link}>
              <motion.div 
                whileHover={{ y: -4 }}
                className='hover:text-accent-primary cursor-pointer'
              >
                {icon}
              </motion.div>
            </a>
          )}
        </div>
        <div>
          Made with 🧡 by the Citrus Hack Team.
        </div>
      </div>
    </footer>
  )
}