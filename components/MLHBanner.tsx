import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export function MLHBanner() {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <a 
      id='mlh-trust-badge' 
      className={
        'block fixed w-full max-w-[60px] md:max-w-[100px] top-0 z-[500] '
        + (status === 'authenticated' && !session.user.uid && router.pathname !== '/apply' ? 'right-44 md:right-[14.25rem] ' 
        : (session ? 'right-[4.25rem] md:right-[7.5rem]' : 'right-[7.5rem] md:right-[10.75rem]'))
      }
      href='https://mlh.io/seasons/2022/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2022-season&utm_content=black' 
      target='_blank'
    >
      <img 
        src='https://s3.amazonaws.com/logged-assets/trust-badge/2022/mlh-trust-badge-2022-black.svg' 
        alt='Major League Hacking 2022 Hackathon Season'
        className='w-full'
      />
    </a>
  )
}