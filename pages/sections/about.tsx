interface StatProps {
  stat: string,
  label: string,
  idx: number
}

const Stat = ({ stat, label, idx }: StatProps) => (
  <div 
    className={
      'flex flex-col items-center py-10 lg:py-0 lg:px-12 '
      + (idx <= 1 ? 'border-b-2 lg:border-b-0 lg:border-r-2' : '')
    }
  >
    <h1 className='text-7xl md:text-8xl font-bold'>
      {stat}
    </h1>
    <p className='m-0 leading-3 text-2xl md:text-4xl font-medium'>
      {label}
    </p>
  </div>
)

export default function About() {
  const stats = [
    { 
      stat: '24',
      label: 'hours',
    },
    { 
      stat: '500+',
      label: 'hackers',
    },
    { 
      stat: '$10k',
      label: 'in prizes',
    },
  ]

  return (
    <section className='flex flex-col w-full h-full mb-20 md:min-h-[60rem] max-w-[60rem] justify-center items-center'>
      <h1>About Us</h1>
      <p className='text-center lg:mb-20'>
        Citrus Hack is where hundreds of students from all over the world come together and form teams, aiming to build a project from scratch in just 24 hours.
      </p>
      <div className='flex flex-col lg:flex-row'>
        { stats.map(({ stat, label }, idx) =>
          <Stat
            key={stat+label}
            stat={stat}
            label={label}
            idx={idx}
          />
        )}
      </div>
    </section>
  )
}
  