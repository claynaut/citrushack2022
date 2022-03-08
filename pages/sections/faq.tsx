import { FaqGrid } from '@/components/FaqAccordion'
import ExternalLink from '@/components/ExternalLink'

export default function Faq() {
  return (
    <section className='flex flex-col w-full h-full my-20 lg:mt-0 min-h-[60rem] max-w-[60rem] items-center'>
      <h1>FAQ</h1>
      <p className='text-center'>
        If you still can&apos;t find an answer to your question, 
        feel free to email us at <ExternalLink name='citrushack@gmail.com' link='mailto:citrushack@gmail.com'/>.
      </p>
      <FaqGrid />
    </section>
  )
}
