import { ShirtStats, FoodStats, ParticipationStats } from '../Statistics'

export function Statistics({ data }) {
  const qualifiedUsers = data.users.filter(user => user.qualified === 'yeah')
  var numTotal = Object.keys(qualifiedUsers).length

  var numOnline = Object.keys(qualifiedUsers.filter(user => user.participation === 'Online')).length
  var numInPerson = Object.keys(qualifiedUsers.filter(user => user.participation === 'In-Person')).length
  
  var numXXS = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'XXS')).length
  var numXS = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'XS')).length
  var numS = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'S')).length
  var numM = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'M')).length
  var numL = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'L')).length
  var numXL = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'XL')).length
  var numXXL = Object.keys(qualifiedUsers.filter(user => user.shirtSize === 'XXL')).length

  const ucrUsers = qualifiedUsers.filter(user => 
    (user.school).toUpperCase() === 'UCR' || 
    (user.school).toUpperCase() === 'UC RIVERSIDE' || 
    (user.school).toUpperCase() === 'UNIVERSITY OF CALIFORNIA RIVERSIDE' || 
    (user.school).toUpperCase() === 'UNIVERSITY OF CALIFORNIA - RIVERSIDE' || 
    (user.school).toUpperCase() === 'UNIVERSITY OF CALIFORNIA, RIVERSIDE'
  )
  var numUCR = Object.keys(ucrUsers).length

  var numMeat = Object.keys(ucrUsers.filter(user => user.foodPreference === 'Meat' && user.participation === 'In-Person')).length
  var numVegetarian = Object.keys(ucrUsers.filter(user => user.foodPreference === 'Vegetarian' && user.participation === 'In-Person')).length
  var numVegan = Object.keys(ucrUsers.filter(user => user.foodPreference === 'Vegan' && user.participation === 'In-Person')).length

  return (
    <div className='flex flex-col gap-4'>
      <ParticipationStats
        numOnline={numOnline}
        numInPerson={numInPerson}
        numUCR={numUCR}
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