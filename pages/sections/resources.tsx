import { useSession } from 'next-auth/react'
import { ButtonLink } from '@/components/ButtonLink'

export default function Resources() {
  const { data: session, status } = useSession()

  return (
    <section className='flex flex-col w-full h-full my-12 lg:my-0 max-w-[60rem] justify-center items-center'>
      <h1 className='mb-16'>Resources</h1>
      <div className='flex flex-col gap-4 w-full'>
        <ButtonLink
          primary
          link='/'
          label='Devpost'
          external
        />
        <ButtonLink
          link='https://github.com/citrushack/CitrusHackResources/blob/main/README.md'
          label='GitHub'
          external
        />
        { status === 'authenticated' 
          && session.user.uid
          && session.user.qualified === 'yeah' &&
          <ButtonLink
            label='Discord'
            link={process.env.discord}
            external
          />
        }
      </div>
    </section>
  )
}
