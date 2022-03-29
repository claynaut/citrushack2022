import { ShirtStats, FoodStats, ParticipationStats } from '../Statistics'

export function Statistics({ data }) {
  const qualifiedUsers = data.users.filter(user => user.qualified === 'yeah')
  const numTotal = Object.keys(qualifiedUsers).length

  const numOnline = Object.keys(qualifiedUsers.filter(user => user.participation === 'Online')).length
  const numInPerson = Object.keys(qualifiedUsers.filter(user => user.participation === 'In-Person')).length

  const ucrUsers = qualifiedUsers.filter(user => 
    (user.school).toUpperCase() === 'UCR' || 
    (user.school).toUpperCase() === 'UC RIVERSIDE' || 
    ((user.school).toUpperCase().includes('CALIFORNIA') && (user.school).toUpperCase().includes('RIVERSIDE')) ||
    (user.school).toUpperCase() === 'UOFR'
  )
  const numUCR = Object.keys(ucrUsers).length
  const numInPersonUCR = Object.keys(ucrUsers.filter(user => user.participation === 'In-Person')).length
  
  const numXXS = Object.keys(ucrUsers.filter(user => user.shirtSize === 'XXS')).length
  const numXS = Object.keys(ucrUsers.filter(user => user.shirtSize === 'XS')).length
  const numS = Object.keys(ucrUsers.filter(user => user.shirtSize === 'S')).length
  const numM = Object.keys(ucrUsers.filter(user => user.shirtSize === 'M')).length
  const numL = Object.keys(ucrUsers.filter(user => user.shirtSize === 'L')).length
  const numXL = Object.keys(ucrUsers.filter(user => user.shirtSize === 'XL')).length
  const numXXL = Object.keys(ucrUsers.filter(user => user.shirtSize === 'XXL')).length

  const numMeat = Object.keys(ucrUsers.filter(user => user.foodPreference === 'Meat' && user.participation === 'In-Person')).length
  const numVegetarian = Object.keys(ucrUsers.filter(user => user.foodPreference === 'Vegetarian' && user.participation === 'In-Person')).length
  const numVegan = Object.keys(ucrUsers.filter(user => user.foodPreference === 'Vegan' && user.participation === 'In-Person')).length

  return (
    <div className='flex flex-col gap-4'>
      <ParticipationStats
        numOnline={numOnline}
        numInPerson={numInPerson}
        numUCR={numUCR}
        numInPersonUCR={numInPersonUCR}
        numTotal={numTotal}
      />
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-sub-secondary rounded-2xl text-center'>
          <h4 className='font-medium'>Shirt Statistics</h4>
        </div>
        <div className='bg-sub-secondary rounded-2xl text-center'>
          <h4 className='font-medium'>Food Statistics</h4>
        </div>
        <ShirtStats 
          numXXS={numXXS}
          numXS={numXS}
          numS={numS}
          numM={numM}
          numL={numL}
          numXL={numXL}
          numXXL={numXXL}
          numTotal={numTotal}
        />
        <FoodStats 
          numMeat={numMeat}
          numVegetarian={numVegetarian}
          numVegan={numVegan}
          numTotal={numTotal}
        />
      </div>
    </div>
  )
}