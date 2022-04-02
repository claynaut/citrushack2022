import { ShirtStats, FoodStats, ParticipationStats } from '../Statistics'

export function Statistics({ data }) {
  const qualifiedUsers = data.users.filter(user => user.qualified === 'yeah')

  const ucrUsers = qualifiedUsers.filter(user => 
    (user.school).toUpperCase() === 'UCR' || 
    (user.school).toUpperCase() === 'UC RIVERSIDE' || 
    ((user.school).toUpperCase().includes('CALIFORNIA') && (user.school).toUpperCase().includes('RIVERSIDE')) ||
    (user.school).toUpperCase() === 'UOFR'
  )
  
  const inPersonUcrUsers = ucrUsers.filter(user => user.participation === 'In-Person')

  return (
    <div className='flex flex-col gap-4'>
      <ParticipationStats
        users={data.users}
        ucrUsers={ucrUsers}
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <ShirtStats users={ucrUsers} />
        <FoodStats users={inPersonUcrUsers} />
      </div>
    </div>
  )
}
