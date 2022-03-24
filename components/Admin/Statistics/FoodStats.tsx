import { StatsBlob } from './StatsBlob'

interface Props {
  numMeat: number
  numVegetarian: number
  numVegan: number
  numTotal: number
}

export function FoodStats({ numMeat, numVegetarian, numVegan, numTotal }: Props) {
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