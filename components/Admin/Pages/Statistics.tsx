export function Statistics({ data }) {
  var numSignedUp = Object.keys(data.users).length
  var numNotApplied = Object.keys(data.users.filter(user => !user.uid)).length
  var numPending = Object.keys(data.users.filter(user => user.qualified === '')).length
  var numApproved = Object.keys(data.users.filter(user => user.qualified === 'yeah')).length
  var numRejected = Object.keys(data.users.filter(user => user.qualified === 'nope')).length

  return (
    <>
      <div className='grid grid-rows-5 grid-flow-col gap-3'>
        <div className='row-span-5 col-span-2 bg-gray-200'>
          Test
        </div>
        <div className='row-span-1 col-span-1 bg-gray-200'>
          Test
        </div>
        <div className='row-span-1 col-span-1 bg-gray-200'>
          Test
        </div>
        <div className='row-span-1 col-span-1 bg-gray-200'>
          Test
        </div>
        <div className='row-span-1 col-span-1 bg-gray-200'>
          Test
        </div>
        <div className='row-span-1 col-span-1 bg-gray-200'>
          Test
        </div>
      </div>
    </>
  )
}