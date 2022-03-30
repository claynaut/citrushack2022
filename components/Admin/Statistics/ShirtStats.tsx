import { StatsBlob } from './StatsBlob'

export function ShirtStats({ users }) {
  const numXXS = Object.keys(users.filter(user => user.shirtSize === 'XXS')).length
  const numXS = Object.keys(users.filter(user => user.shirtSize === 'XS')).length
  const numS = Object.keys(users.filter(user => user.shirtSize === 'S')).length
  const numM = Object.keys(users.filter(user => user.shirtSize === 'M')).length
  const numL = Object.keys(users.filter(user => user.shirtSize === 'L')).length
  const numXL = Object.keys(users.filter(user => user.shirtSize === 'XL')).length
  const numXXL = Object.keys(users.filter(user => user.shirtSize === 'XXL')).length
  const numTotal = Object.keys(users).length

  return (
    <div className='grid grid-rows-7 gap-4 rounded-2xl'>
      <StatsBlob
        num={numXXS}
        numTotal={numTotal}
        label='XXS Shirts'
      />
      <StatsBlob
        num={numXS}
        numTotal={numTotal}
        label='XS Shirts'
      />
      <StatsBlob
        num={numS}
        numTotal={numTotal}
        label='S Shirts'
      />
      <StatsBlob
        num={numM}
        numTotal={numTotal}
        label='M Shirts'
      />
      <StatsBlob
        num={numL}
        numTotal={numTotal}
        label='L Shirts'
      />
      <StatsBlob
        num={numXL}
        numTotal={numTotal}
        label='XL Shirts'
      />
      <StatsBlob
        num={numXXL}
        numTotal={numTotal}
        label='XXL Shirts'
      />
    </div>
  )
}