import {
  BiCheckbox,
  BiCheckboxSquare,
  BiDownload,
  BiRefresh
} from 'react-icons/bi'
import { loadFiles, downloadFiles } from './methods'

export function FileActions({ allSelected, toggleSelectAllDocs, selectedDocs, setDocs }) {
  return (
    <>
      <p className='m-0 mt-3 mb-2 font-normal text-base'>
        <span className='font-medium'>Tip:</span> Select a row to perform more actions.
      </p>
      <div className='flex gap-2 items-center text-2xl'>
        <div
          className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
          onClick={() => toggleSelectAllDocs(!allSelected)}
        >
          {
            allSelected ? <BiCheckboxSquare title='Select All' /> : <BiCheckbox title='Select All' />
          }
        </div>
        <div
          className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
          onClick={() => loadFiles(setDocs)}
        >
          <BiRefresh title='Refresh Files' /> 
        </div>
        {
          selectedDocs.length > 0 &&
          <div className='flex gap-1 items-center pl-2 border-l-2'>
            <div
              className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-green-600 hover:bg-green-100 cursor-pointer'
              onClick={() => downloadFiles(selectedDocs)}
            >
              <BiDownload title='Download Selected' />
              <span className='text-base'>Download Selected</span>
            </div>
          </div>
        }
      </div>
    </>
  )
}