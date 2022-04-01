import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  primary?: boolean
  secondary?: boolean
  label: string
  skinny?: boolean
  minWidth?: boolean
}

const Button = ({ primary, secondary, label, skinny, minWidth }: ButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.995 }}
    className={
      'flex justify-center items-center self-center w-full px-4 font-semibold shadow rounded-md cursor-pointer '
      + (primary ? 'bg-highlight hover:bg-highlight-dark ' : (secondary ? 'bg-sub hover:bg-highlight ' : 'hover:bg-accent-sub '))
      + (skinny ? 'py-1.5 ' : 'h-11 md:max-w-[16rem] text-lg ')
      + (minWidth ? 'md:w-auto' : '')
    }
  >
    {label}
  </motion.button>
)

Button.defaultProps = {
  primary: Boolean(false),
  secondary: Boolean(false),
  skinny: Boolean(false),
  minWidth: Boolean(false),
}

interface ButtonLinkProps {
  /** Decides whether the button is a primary or secondary color. */
  primary?: boolean
  secondary?: boolean
  /** Text displayed on button. */
  label: string
  /** Link to internal or external source. */
  link: string
  /** Decides whether the button is linked to an external source. */
  external?: boolean
  /** Decides whether the button is skinny (i.e. short height). */
  skinny?: boolean
  /** Decides whether the button is the minimum width needed to contain its label. */
  minWidth?: boolean
}

/** Button that links to an internal or external source. */
export const ButtonLink = ({ primary, secondary, label, link, external, skinny, minWidth }: ButtonLinkProps) => (
  <>
    {
      external
      ?
      <a target='_blank' rel='noreferrer noopener' href={link} className='flex justify-center w-full'>
        <Button 
          primary={primary}
          secondary={secondary}
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
              secondary={secondary}
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