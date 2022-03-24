import { StatsBlob } from './StatsBlob'

interface Props {
  numOnline: number
  numInPerson: number
  numTotal: number
}

export function ParticipationStats({ numOnline, numInPerson, numTotal }: Props) {
  return (
    <div className='grid grid-cols-2 gap-4 rounded-2xl'>
      <div className='col-span-2 bg-sub-secondary rounded-2xl text-center'>
        <h4 className='font-medium'>Participation Statistics</h4>
      </div>
      <StatsBlob
        num={numOnline}
        numTotal={numTotal}
        label='Online Participants'
      />
      <StatsBlob
        num={numInPerson}
        numTotal={numTotal}
        label='In-Person Participants'
      />
    </div>
  )
}