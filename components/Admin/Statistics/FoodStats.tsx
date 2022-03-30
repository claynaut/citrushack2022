import { StatsBlob } from './StatsBlob'

export function FoodStats({ users }) {
  const numMeat = Object.keys(users.filter(user => user.foodPreference === 'Meat')).length
  const numVegetarian = Object.keys(users.filter(user => user.foodPreference === 'Vegetarian')).length
  const numVegan = Object.keys(users.filter(user => user.foodPreference === 'Vegan')).length
  const numTotal = Object.keys(users).length

  return (
    <div className='grid grid-rows-3 gap-4 rounded-2xl'>
      <StatsBlob
        num={numMeat}
        numTotal={numTotal}
        label='Meat Eaters'
      />
      <StatsBlob
        num={numVegetarian}
        numTotal={numTotal}
        label='Vegetarians'
      />
      <StatsBlob
        num={numVegan}
        numTotal={numTotal}
        label='Vegans'
      />
    </div>
  )
}
