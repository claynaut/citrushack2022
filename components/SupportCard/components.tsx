import { motion } from 'framer-motion'
interface Props {
  title: string, 
  description: string, 
  buttonLabel: string, 
  buttonLink: string
}

export const SupportCard = ({ title, description, buttonLabel, buttonLink }: Props) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className='flex flex-col items-center w-full p-10 shadow-lg rounded-md cursor-default'
  >
    <h3>{title}</h3>
    <p className='grow mb-10 text-center'>
      {description}
    </p>
    <a target='_blank' rel='noreferrer noopener' href={buttonLink}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.995 }}
        className='flex justify-center items-center self-center h-11 w-40 px-4 font-semibold text-lg rounded-md bg-amber-500 text-white cursor-pointer'
      >
        {buttonLabel}
      </motion.button>
    </a>
  </motion.div>
)