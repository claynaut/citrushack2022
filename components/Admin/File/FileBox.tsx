import { motion } from 'framer-motion'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiDownload,
  BiLinkExternal
} from 'react-icons/bi'
import { downloadFile, openFile } from './methods'

export function FileBox({ doc, selectedDocs, setSelectedDocs, setDocs }) {
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
          'border-2 rounded-md bg-white shadow-md cursor-pointer transition-size duration-150 overflow-hidden '
          + (selectedDocs.includes(doc) ? 'border-gray-500 ' : ' ')
        }
      >
        <div className='flex'>
          <div>
            <div 
              className={
                'w-10 p-2 rounded-full text-2xl group-hover:text-black hover:bg-gray-100 '
                + (selectedDocs.includes(doc) ? 'text-black' : 'text-gray-400')
              }
              onClick={
                () => { setSelectedDocs(
                  selectedDocs.includes(doc) ? 
                    selectedDocs.filter(selectedDoc => selectedDoc !== doc) :
                    selectedDocs.concat([doc])
                ); selectDoc(doc) }
              }
            >
              {
                selectedDocs.includes(doc) ?
                <BiCheckboxSquare title='Select'/>
                :
                <BiCheckbox title='Select'/>
              }
            </div>
          </div>
          <div className='flex justify-between w-full'>
            <div className='py-2'>
              {doc.name.replace(/###/g, '_')}
            </div>
            <div className='flex gap-1 items-center'>
              <div
                className='w-9 p-2 rounded-full text-xl hover:text-blue-500 hover:bg-blue-100 cursor-pointer'
                onClick={() => openFile(doc)}
              >
                <BiLinkExternal title='Open in New Tab' />
              </div>
              <div
                className='w-9 p-2 rounded-full text-xl hover:text-green-600 hover:bg-green-100 cursor-pointer'
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