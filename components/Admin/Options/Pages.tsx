import { motion } from 'framer-motion'

export function Pages({ pageOptions, selectedPage, selectPage }) {
  return (
    <div className='flex gap-6 my-8'>
    { pageOptions.map((option) =>
      <button
        key={option}
        className={
          'flex flex-col items-center group text-2xl '
          + (selectedPage === option ? 'font-semibold text-black' : 'font-normal text-gray-400')
        }
        onClick={() => selectPage(option) }
      >
        <motion.div
          whileHover={{ y: -3 }}
          className='py-1.5'
        >
          {option}
        </motion.div>
        <div 
          className={
            'w-10 border-b-2 '
            + (selectedPage === option ? 'border-black' : 'border-gray-200 group-hover:border-gray-400')
          }
        />
      </button>
    )}
  </div>
  )
}