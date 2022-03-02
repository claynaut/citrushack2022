import { SupportCard } from '@/components/SupportCard'

export default function Support() {
  const cards = [
    {
      title: 'Mentors', 
      description: 'Mentors are in charge of helping the hackers with new technologies and working through any bugs or obstacles they encounter. We recommend this position if you are well versed in a particular stack to offer the best guidance.', 
      buttonLabel: 'Apply', 
      buttonLink: '/'
    },
    {
      title: 'Volunteers', 
      description: 'Volunteers help out with the majority of day-of event tasks including, but not limited to, matching hackers to mentors, helping hackers find teams, hosting activities, and answering general questions.', 
      buttonLabel: 'Apply', 
      buttonLink: '/'
    },
    {
      title: 'Sponsors', 
      description: 'Sponsors are companies or individuals that want to help Cutie Hack and Citrus Hack come to life! If you are interested in contributing, please don\'t hesitate to contact us!',
      buttonLabel: 'Sponsor', 
      buttonLink: '/'
    }
  ]

  return (
    <section className='flex flex-col w-full h-full min-h-[60rem] max-w-[60rem] justify-center items-center'>
      <h1 className='text-center'>Get Involved</h1>
      <p className='mb-10 text-center'>
        Not interested in hacking but still want to participate? Great! 
        We would love to have you on board. Fill out the forms below if
        you&apos;d like to help hackers throughout the day.
      </p>
      <div className='flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-center gap-6'>
      { cards.map(({ title, description, buttonLabel, buttonLink }) =>
        <SupportCard
          key={title}
          title={title}
          description={description}
          buttonLabel={buttonLabel}
          buttonLink={buttonLink}
        />
      )}
      </div>
    </section>
  )
}
