import { motion } from 'framer-motion'
import { ButtonLink } from '@/components/ButtonLink'

interface Props {
  /** Heading at the top of the card. */
  title: string
  /** Description about the way to support the hackathon. */
  description: string
  /** Name of the button to diplsay. */
  buttonLabel: string
  /** Link to external source. */
  buttonLink: string
}

/** Card to display information about ways to support the hackathon. */
export const SupportCard = ({ title, description, buttonLabel, buttonLink }: Props) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className='flex flex-col items-center w-full md:max-w-md p-10 bg-card shadow-lg rounded-md cursor-default'
  >
    <h3 className='font-bold'>{title}</h3>
    <p className='grow mb-8 text-center'>
      {description}
    </p>
    <ButtonLink
      link={buttonLink}
      label={buttonLabel}
      external
    />
  </motion.div>
)