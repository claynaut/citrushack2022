import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { loadFiles } from '../File/methods'

export function Pages({ pageOptions, selectedPage, selectPage }) {
  const [docs, setDocs] = useState(localStorage.getItem('docs') ? JSON.parse(localStorage.getItem('docs')) : [])

  return (
    <div className='flex gap-6 my-8'>
    { pageOptions.map((option) =>
      <button
        key={option}
        className={
          'flex flex-col items-center group text-2xl bg-transparent '
          + (selectedPage === option ? 'font-semibold' : 'font-medium text-sub-highlight hover:text-text')
        }
        onClick={() => { selectPage(option); if (option === 'Resumes'){loadFiles(setDocs)} }}
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
            + (selectedPage === option ? 'border-text' : 'border-sub-highlight group-hover:border-text')
          }
        />
      </button>
    )}
  </div>
  )
}