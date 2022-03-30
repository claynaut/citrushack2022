interface Props {
  num: number
  numTotal: number
  label: string
}

export const StatsBlob = ({ num, numTotal, label }: Props) => (
  <div className='flex flex-col items-center grid grid-cols-2 p-4 bg-sub rounded-2xl text-center text-sub-bright'>
    <div>
      <h3 className='font-medium text-xl md:text-3xl'>{num}</h3>
      <p className='m-0 text-sm md:text-base'>{label}</p>
    </div>
    <div>
      <h3 className='font-medium text-xl md:text-3xl'>{(num / numTotal * 100).toFixed(2)}%</h3>
      <p className='m-0 text-sm md:text-base'>% of Total</p>
    </div>
  </div>
)