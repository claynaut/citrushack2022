import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  primary?: boolean,
  label: string,
  skinny?: boolean
}

const Button = ({ primary, label, skinny }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.995 }}
    className={
      'flex justify-center items-center self-center w-full px-4 font-semibold rounded-md cursor-pointer '
      + (primary ? 'bg-highlight hover:bg-highlight-dark ' : 'hover:bg-[#F2CAA0] ')
      + (skinny ? 'py-1.5' : 'h-11 md:max-w-[16rem] text-lg')
    }
  >
    {label}
  </motion.button>
)

Button.defaultProps = {
  primary: Boolean(false),
  skinny: Boolean(false),
}

interface ButtonLinkProps {
  primary?: boolean,
  label: string,
  link: string,
  external?: boolean,
  skinny?: boolean,
}

export const ButtonLink = ({ primary, label, link, external, skinny }: ButtonLinkProps) => (
  <>
    {
      external
      ?
      <a target='_blank' rel='noreferrer noopener' href={link} className='flex justify-center w-full'>
        <Button 
          primary={primary}
          label={label}
          skinny={skinny}
        />
      </a>
      :
      <span className='flex justify-center w-full'>
        <Link passHref href={link}>
          <Button 
            primary={primary}
            label={label}
            skinny={skinny}
          />
        </Link>
      </span>
    }
  </>
)

ButtonLink.defaultProps = {
  primary: Boolean(false),
  external: Boolean(false),
  skinny: Boolean(false),
}