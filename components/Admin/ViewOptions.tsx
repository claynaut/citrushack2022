import { motion } from 'framer-motion'

export function ViewOptions({ viewOptions, selectedView, selectView }) {
  return (
    <div className='grid grid-cols-5'>
    { viewOptions.map((option) =>
      <button
        className={
          'border-b-2 '
          + (selectedView === option ? ' font-semibold text-black border-black' : ' font-normal text-gray-400 border-gray-200 hover:text-gray-500 hover:border-gray-400')
        }
        onClick={() => selectView(option)}
      >
        <motion.div
          whileHover={{ y: -3 }}
          className='py-1.5'
        >
          {option}
        </motion.div>
      </button>
    )}
  </div>
  )
}