import { motion } from 'framer-motion'

export function Overviews({ viewOptions, selectedView, selectView, setFilter, setSorted }) {
  return (
    <div className='grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4'>
    { viewOptions.map((option) =>
      <button
        key={option}
        className={
          'border-b-2 bg-transparent '
          + (selectedView === option ? 'font-semibold border-text' : 'font-medium text-sub-highlight border-sub-highlight hover:text-text hover:border-text')
        }
        onClick={() => { selectView(option); setFilter('Default'); setSorted(false) }}
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