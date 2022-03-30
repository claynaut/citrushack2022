import { StatsBlob } from './StatsBlob'

export function ParticipationStats({ users, ucrUsers }) {
  const numOnline = Object.keys(users.filter(user => user.participation === 'Online')).length
  const numInPerson = Object.keys(users.filter(user => user.participation === 'In-Person')).length
  const numTotal = Object.keys(users).length
  const numUCR = Object.keys(ucrUsers).length
  const numInPersonUCR = Object.keys(ucrUsers.filter(user => user.participation === 'In-Person')).length

  return (
    <div className='grid grid-cols-2 gap-4 rounded-2xl'>
      <div className='col-span-2 bg-sub-secondary rounded-2xl text-center'>
        <h4 className='font-medium'>Participation Statistics</h4>
      </div>
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
  )
}