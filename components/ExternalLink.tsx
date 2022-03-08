interface Props {
  name: string
  link: string
}

export default function ExternalLink({ name, link }: Props) {
  return (
    <a target='_blank' rel='noreferrer noopener' href={link}>
      <span className='font-semibold text-highlight hover:underline cursor-pointer'>
        {name}
      </span>
    </a>
  )
}