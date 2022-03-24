import { StatsBlob } from './StatsBlob'

interface Props {
  numXXS: number
  numXS: number
  numS: number
  numM: number
  numL: number
  numXL: number
  numXXL: number
  numTotal: number
}

export function ShirtStats({ numXXS, numXS, numS, numM, numL, numXL, numXXL, numTotal }: Props) {
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