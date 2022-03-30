import { StatsBlob } from './StatsBlob'

export function ParticipationStats({ users, ucrUsers }) {
  const numOnline = Object.keys(users.filter(user => user.participation === 'Online')).length
  const numInPerson = Object.keys(users.filter(user => user.participation === 'In-Person')).length
  const numCheckedIn = Object.keys(users.filter(user => user.checkedIn)).length
  const numTotal = Object.keys(users).length
  const numUCR = Object.keys(ucrUsers).length
  const numInPersonUCR = Object.keys(ucrUsers.filter(user => user.participation === 'In-Person')).length

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-sub-secondary rounded-2xl text-center'>
        <h4 className='font-medium'>Participation</h4>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 col-span-2'>
          <StatsBlob
            num={numOnline}
            numTotal={numTotal}
            label='Online'
          />
          <StatsBlob
            num={numInPerson}
            numTotal={numTotal}
            label='In-Person'
          />
          <StatsBlob
            num={numCheckedIn}
            numTotal={numTotal}
            label='Checked-In'
          />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2'>
          <StatsBlob
            num={numUCR}
            numTotal={numTotal}
            label='Total From UCR'
          />
          <StatsBlob
            num={numInPersonUCR}
            numTotal={numTotal}
            label='In-Person From UCR'
          />
        </div>
      </div>
    </div>
  )
}