import { motion } from 'framer-motion'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiDownload,
  BiLinkExternal
} from 'react-icons/bi'
import { downloadFile, openFile } from './methods'

export function FileBox({ doc, selectedDocs, setSelectedDocs }) {
  const selectDoc = (doc) => {
    if (selectedDocs.includes(doc)) {
      localStorage.setItem('selectedDocs', JSON.stringify(selectedDocs.filter(selectedDoc => selectedDoc !== doc)))
    }
    else {
      localStorage.setItem('selectedDocs', JSON.stringify(selectedDocs.concat([doc])))
    }
  }

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className='relative group'
    >
      <div
        className={
          'border-2 border-sub rounded-md bg-card shadow-md cursor-pointer transform-gpu transition-size duration-150 overflow-hidden '
          + (selectedDocs.includes(doc) ? 'border-text ' : ' ')
        }
      >
        <div className='flex'>
          <div className='mr-3'>
            <div 
              className={
                'w-10 p-2 rounded-full text-2xl group-hover:text-text hover:bg-sub '
                + (selectedDocs.includes(doc) ? 'text-text' : 'text-sub')
              }
              onClick={() => { setSelectedDocs(
                  selectedDocs.includes(doc) ? 
                  selectedDocs.filter(selectedDoc => selectedDoc !== doc) :
                  selectedDocs.concat([doc])
                ); selectDoc(doc) }
              }
            >
              {
                selectedDocs.includes(doc) ?
                <BiCheckboxSquare title='Deselect'/>
                :
                <BiCheckbox title='Select'/>
              }
            </div>
          </div>
          <div className='flex items-center w-full '>
            <div className='grow w-0 py-2 text-sm md:text-base truncate text-ellipsis'>
              {doc.name.replace(/___/g, '_')}
            </div>
            <div className='flex gap-1 items-center'>
              <div
                className='w-9 p-2 rounded-full text-lg md:text-xl hover:text-blue-500 hover:bg-blue-200 cursor-pointer'
                onClick={() => openFile(doc)}
              >
                <BiLinkExternal title='Open in New Tab' />
              </div>
              <div
                className='w-9 p-2 rounded-full text-lg md:text-xl hover:text-green-600 hover:bg-green-200 cursor-pointer'
                onClick={() => downloadFile(doc)}
              >
                <BiDownload title='Download' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}