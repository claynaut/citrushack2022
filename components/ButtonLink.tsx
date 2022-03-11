import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  primary?: boolean,
  label: string,
  skinny?: boolean,
  minWidth?: boolean,
}

const Button = ({ primary, label, skinny, minWidth }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.995 }}
    className={
      'flex justify-center items-center self-center w-full px-4 font-semibold shadow rounded-md cursor-pointer '
      + (primary ? 'bg-highlight hover:bg-highlight-dark ' : 'hover:bg-accent-sub ')
      + (skinny ? 'py-1.5 ' : 'h-11 md:max-w-[16rem] text-lg ')
      + (minWidth ? 'md:w-auto' : '')
    }
  >
    {label}
  </motion.button>
)

Button.defaultProps = {
  primary: Boolean(false),
  skinny: Boolean(false),
  minWidth: Boolean(false),
}

interface ButtonLinkProps {
  primary?: boolean,
  label: string,
  link: string,
  external?: boolean,
  skinny?: boolean,
  minWidth?: boolean,
}

export const ButtonLink = ({ primary, label, link, external, skinny, minWidth }: ButtonLinkProps) => (
  <>
    {
      external
      ?
      <a target='_blank' rel='noreferrer noopener' href={link} className='flex justify-center w-full'>
        <Button 
          primary={primary}
          label={label}
          skinny={skinny}
          minWidth={minWidth}
        />
      </a>
      :
      <Link passHref href={link}>
        <span className='flex justify-center w-full'>
            <Button 
              primary={primary}
              label={label}
              skinny={skinny}
              minWidth={minWidth}
            />
        </span>
      </Link>
    }
  </>
)

ButtonLink.defaultProps = {
  primary: Boolean(false),
  external: Boolean(false),
  skinny: Boolean(false),
  minWidth: Boolean(false),
}