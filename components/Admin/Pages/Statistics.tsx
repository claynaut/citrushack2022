import { ShirtStats, FoodStats, ParticipationStats } from '../Statistics'

export function Statistics({ data }) {
  var numTotal = Object.keys(data.users.filter(user => user.qualified === 'yeah')).length
  var numXXS = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'XXS')).length
  var numXS = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'XS')).length
  var numS = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'S')).length
  var numM = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'M')).length
  var numL = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'L')).length
  var numXL = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'XL')).length
  var numXXL = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.shirtSize === 'XXL')).length
  var numMeat = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.foodPreference === 'Meat')).length
  var numVegetarian = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.foodPreference === 'Vegetarian')).length
  var numVegan = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.foodPreference === 'Vegan')).length
  var numOnline = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.participation === 'Online')).length
  var numInPerson = Object.keys(data.users.filter(user => user.qualified === 'yeah' && user.participation === 'In-Person')).length

  return (
    <div className='flex flex-col gap-4'>
      <ParticipationStats
        numOnline={numOnline}
        numInPerson={numInPerson}
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