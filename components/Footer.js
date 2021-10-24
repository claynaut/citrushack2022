import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  FaRegEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare
} from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='flex justify-center w-full py-12 bg-gray-200'>
      <div className='flex flex-col gap-4 items-center w-full mx-4 text-md font-semibold'>
        <div className='flex gap-2 text-2xl'>
          <motion.span whileHover={{ y: -3 }}>
            <Link
              passHref
              href='mailto:citrushack@gmail.com'
            >
              <FaRegEnvelope className='hover:text-accent-primary cursor-pointer'/>
            </Link>
          </motion.span>
          <motion.span whileHover={{ y: -3 }}>
            <Link
              passHref
              href='https://www.facebook.com/CitrusHack'
            >
              <FaFacebookSquare className='hover:text-accent-primary cursor-pointer'/>
            </Link>
          </motion.span>
          <motion.span whileHover={{ y: -3 }}>
            <Link
              passHref
              href='https://www.instagram.com/citrushack_ucr'
            >
              <FaInstagram className='hover:text-accent-primary cursor-pointer'/>
            </Link>
          </motion.span>
          <motion.span whileHover={{ y: -3 }}>
            <Link
              passHref
              href='https://twitter.com/citrushack'
            >
              <FaTwitterSquare className='hover:text-accent-primary cursor-pointer'/>
            </Link>
          </motion.span>
          <motion.span whileHover={{ y: -3 }}>
            <Link
              passHref
              href='https://www.linkedin.com/company/citrus-hack'
            >
              <FaLinkedin className='hover:text-accent-primary cursor-pointer'/>
            </Link>
          </motion.span>
        </div>
        <div>
          Made with 🧡 by the Citrus Hack Team.
        </div>
      </div>
    </footer>
  )
}