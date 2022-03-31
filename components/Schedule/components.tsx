interface EventBlockProps {
  name: string
  startTime: string
  endTime?: string
  hybrid?: boolean
  room?: string
}

const EventBlock = ({ name, startTime, endTime, hybrid, room }: EventBlockProps) => (
  <div className='flex items-center bg-card p-3 rounded-md shadow-md text-left'>
    <div className='flex flex-col w-full max-w-[8.25rem] text-sub-bright font-medium'>
      <span>
        {startTime} {endTime && <>- {endTime}</>}
      </span>
    </div>
    <div>
      <p className='m-0 text-base font-medium'>{name}</p>
      { hybrid &&
        <div className='text-sm text-highlight font-medium italic'>
          Hybrid
          <div>
            (In-Person @ {room})
          </div>
        </div> 
      }
    </div>
  </div>
)

interface EventStackProps {
  title: string
  subtitle?: string
  events: EventBlockProps[]
}

const EventStack = ({ title, subtitle, events }: EventStackProps) => (
  <div className='flex flex-col gap-3 w-full max-w-lg lg:max-w-md'>
    <div>
      <h4 className='m-0 font-medium'>{title}</h4>
      { subtitle && <p>{subtitle}</p> }
    </div>
    { events.map(({ name, startTime, endTime, hybrid, room }) =>
      <EventBlock
        key={name}
        name={name}
        startTime={startTime}
        endTime={endTime}
        hybrid={hybrid}
        room={room}
      />
    )}
  </div>
)

interface Schedule {
  event: EventBlockProps[]
  workshops?: EventBlockProps[]
  activities: EventBlockProps[]
}

interface ScheduleGridProps {
  title: string
  schedule: Schedule
}

function ScheduleGrid ({ title, schedule }: ScheduleGridProps) {
  const { event, workshops, activities } = schedule

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='col-span-3 font-bold'>{title}</h3>
      <div className='flex flex-col justify-center items-center lg:items-baseline lg:flex-row gap-4'>
        <EventStack
          title='Event'
          subtitle={null}
          events={event}
        />
        { workshops &&
          <EventStack
            title='Workshops'
            subtitle={null}
            events={workshops}
          />
        }
        <EventStack
          title='Activities'
          subtitle={null}
          events={activities}
        />
      </div>
    </div>
  )
}

const saturdaySchedule = {
  event: [
    {
      name: 'Check-In',
      startTime: '7',
      endTime: '8 AM',
      hybrid: Boolean(true),
      room: 'MSE 116',
    },
    {
      name: 'Opening Ceremony',
      startTime: '8',
      endTime: '9 AM',
      hybrid: Boolean(true),
      room: 'MSE 116',
    },
    {
      name: 'Hackathon Start',
      startTime: '9 AM',
    },
    {
      name: 'Lunch',
      startTime: '1 PM',
    },
    {
      name: 'Dinner',
      startTime: '6 PM',
    },
  ],
  workshops: [
    {
      name: 'Teambuilding Activity',
      startTime: '9:30',
      endTime: '10 AM',
      hybrid: Boolean(true),
      room: 'WCH 202',
    },
    {
      name: 'Intro to Git/GitHub',
      startTime: '10',
      endTime: '11 AM',
      hybrid: Boolean(true),
      room: 'Bourns A265',
    },
    {
      name: 'Intro to Unity',
      startTime: '11 AM',
      endTime: '12 PM',
    },
    {
      name: 'Intro to Discord Bots',
      startTime: '11 AM',
      endTime: '12 PM',
    },
    {
      name: 'Intro to UI/UX',
      startTime: '11 AM',
      endTime: '12 PM',
      hybrid: Boolean(true),
      room: 'Bourns A125',
    },
    {
      name: 'Intro to iOS Development',
      startTime: '12',
      endTime: '1 PM',
      hybrid: Boolean(true),
      room: 'Bourns A265',
    },
    {
      name: 'Intro to CTF',
      startTime: '12',
      endTime: '1 PM',
      hybrid: Boolean(true),
      room: 'Bourns A125',
    },
    {
      name: 'Snapchat\'s Workshop - Augmented Reality',
      startTime: '2',
      endTime: '3 PM',
    },
    {
      name: 'Intro to Next.JS',
      startTime: '2',
      endTime: '3 PM',
    },
    {
      name: 'Amazon\'s Workshop - Diversity in Tech: Latinx at Amazon',
      startTime: '3',
      endTime: '4 PM',
      hybrid: Boolean(true),
      room: 'Bourns A625',
    },
    {
      name: 'Hacking Your Resume',
      startTime: '4',
      endTime: '5 PM',
      hybrid: Boolean(true),
      room: 'Bouurns A265',
    },
    {
      name: 'Intro to VR',
      startTime: '4',
      endTime: '5 PM',
      hybrid: Boolean(true),
      room: 'Bourns A125',
    },
    {
      name: 'What They Don\'t Tell You About Tech Interviews',
      startTime: '5',
      endTime: '6 PM',
    },
    {
      name: 'Python Workshop',
      startTime: '5',
      endTime: '6 PM',
      hybrid: Boolean(true),
      room: 'Bourns A265',
    },
    {
      name: 'Unity Particle Systems',
      startTime: '7',
      endTime: '8 PM',
    },
  ],
  activities: [
    {
      name: 'CSSBattle',
      startTime: '12:30',
      endTime: '1 PM',
    },
    {
      name: 'CTF',
      startTime: '1',
      endTime: '10:30 PM',
    },
    {
      name: 'Lunch with the Leads',
      startTime: '1',
      endTime: '1:30 PM',
    },
    {
      name: 'Raffle',
      startTime: '1:30',
      endTime: '2 PM',
    },
    {
      name: 'Typeracer Tournament',
      startTime: '2',
      endTime: '3 PM',
    },
    {
      name: 'Therapy Fluffies',
      startTime: '3',
      endTime: '3:30 PM',
    },
    {
      name: 'Trivia Kahoot',
      startTime: '4',
      endTime: '4:30 PM',
    },
    {
      name: 'Painting With Bob Ross',
      startTime: '5',
      endTime: '5:30 PM',
    },
    {
      name: 'Improv Slides',
      startTime: '6:30',
      endTime: '7 PM',
    },
    {
      name: 'Norm the Navel Photo Op',
      startTime: '8',
      endTime: '9 PM',
    },
    {
      name: 'Gartic Phone',
      startTime: '11 PM',
      endTime: '12 AM',
    },
    {
      name: 'Community Hacking',
      startTime: '12',
      endTime: '1 AM',
    },
    {
      name: 'Jackbox',
      startTime: '1',
      endTime: '2 AM',
    },
  ],
}

const sundaySchedule = {
  event: [
    {
      name: 'Hackathon End',
      startTime: '9 AM',
    },
    {
      name: 'Breakfast',
      startTime: '9 AM',
    },
    {
      name: 'Judging',
      startTime: '11 AM',
      endTime: '1:30 PM',
    },
    {
      name: 'Closing Ceremony',
      startTime: '2',
      endTime: '3 PM',
      hybrid: Boolean(true),
      room: 'MSE 116',
    },
  ],
  activities: [
    {
      name: 'Minecraft',
      startTime: '9',
      endTime: '10 AM',
    },
  ],
}

export const MasterSchedule = () => (
  <div className='flex flex-col gap-6 w-full text-center'>
    <ScheduleGrid title='Saturday, April 2' schedule={saturdaySchedule} />
    <ScheduleGrid title='Sunday, April 3' schedule={sundaySchedule} />
  </div>
)