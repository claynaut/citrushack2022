import { StatsBlob } from './StatsBlob'

export function ParticipationStats({ users, ucrUsers }) {
  const numTotal = Object.keys(users).length

  const qualifiedUsers = users.filter(user => user.qualified === 'yeah')
  const numTotalQualified = Object.keys(qualifiedUsers).length

  const numOnline = Object.keys(qualifiedUsers.filter(user => user.participation === 'Online')).length
  const numInPerson = Object.keys(qualifiedUsers.filter(user => user.participation === 'In-Person')).length

  // const numCheckedIn = Object.keys(qualifiedUsers.filter(user => user.checkedIn)).length
  const numOnlineCheckedIn = Object.keys(qualifiedUsers.filter(user => user.participation === 'Online' && user.checkedIn)).length
  const numInPersonCheckedIn = Object.keys(qualifiedUsers.filter(user => user.participation === 'In-Person' && user.checkedIn)).length
  
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
            num={numTotalQualified}
            numTotal={numTotal}
            label='Total Approved'
          />
          <StatsBlob
            num={numOnline}
            numTotal={numTotalQualified}
            label='Online'
          />
          <StatsBlob
            num={numInPerson}
            numTotal={numTotalQualified}
            label='In-Person'
          />
        </div>
        <StatsBlob
          num={numUCR}
          numTotal={numTotalQualified}
          label='Total From UCR'
        />
        <StatsBlob
          num={numInPersonUCR}
          numTotal={numTotalQualified}
          label='In-Person From UCR'
        />
        <StatsBlob
          num={numOnlineCheckedIn}
          numTotal={numTotalQualified}
          label='Online Checked-In'
        />
        <StatsBlob
          num={numInPersonCheckedIn}
          numTotal={numTotalQualified}
          label='In-Person Checked-In'
        />
      </div>
    </div>
  )
}