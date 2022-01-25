import {
  BiBell,
  BiTask,
  BiTaskX,
  BiHighlight
} from 'react-icons/bi'

export function Legend({selectedView}) {
  return (
    <div className='flex items-center mb-2 gap-4'>
      <p className='m-0 mt-2 font-medium text-base'>Action Legend:</p>
      {
        selectedView === 'Pending' &&
        <div className='flex items-center mt-2 gap-4'>
          <span className='flex items-center gap-2 text-blue-500'>
            <BiHighlight className='text-xl'/>
            <p className='my-0.5 text-base'>Review based on if criteria was met</p>
          </span>
          <span className='text-gray-400'>|</span>
          <span className='flex items-center gap-2 text-green-600'>
            <BiTask className='text-xl'/>
            <p className='my-0.5 text-base'>Approve</p>
          </span>
          <span className='text-gray-400'>|</span>
          <span className='flex items-center gap-2 text-red-500'>
            <BiTaskX className='text-xl'/>
            <p className='my-0.5 text-base'>Reject</p>
          </span>
        </div>
      }
      {
        selectedView === 'Not Applied' &&
        <div className='flex items-center mt-2 gap-4'>
          <span className='flex items-center gap-2 text-amber-500'>
            <BiBell className='text-xl'/>
            <p className='my-0.5 text-base'>Send email reminder to apply</p>
          </span>
        </div>
      }
    </div>
  )
}