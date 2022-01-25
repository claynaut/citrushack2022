interface Props {
    numSignedUp: number
    numNotApplied: number
    numPending: number
    numApproved: number
    numRejected: number
  }
  
  export function OverviewStats({numSignedUp, numNotApplied, numPending, numApproved, numRejected}: Props) {
    return (
      <div className='grid grid-cols-5 gap-4'>
        <div className='grid grid-cols-2 col-span-2 bg-blue-200 rounded-2xl'>
          <div className='flex flex-col px-8 py-6'>
            <h3 className='font-medium'>{numSignedUp}</h3>
            <p className='m-0 text-base'>Total users signed up</p>
          </div>
          <div className='flex flex-col px-8 py-6'>
            <h3 className='font-medium'>{numNotApplied}</h3>
            <p className='m-0 text-base'>Total users not applied</p>
          </div>
        </div>
        <div className='flex flex-col px-8 py-6 bg-green-200 rounded-2xl'>
          <h3 className='font-medium'>{numApproved}</h3>
          <p className='m-0 text-base'>Total approved applications</p>
        </div>
        <div className='flex flex-col px-8 py-6 bg-amber-100 rounded-2xl'>
          <h3 className='font-medium'>{numPending}</h3>
          <p className='m-0 text-base'>Total pending applications</p>
        </div>
        <div className='flex flex-col px-8 py-6 bg-red-200 rounded-2xl'>
          <h3 className='font-medium'>{numRejected}</h3>
          <p className='m-0 text-base'>Total rejected applications</p>
        </div>
      </div>
    )
  }