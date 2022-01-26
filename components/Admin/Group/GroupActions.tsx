import {
  BiExpand,
  BiCollapse,
  BiListUl,
  BiGridAlt
} from 'react-icons/bi'

export function GroupActions({ expandedGroups, toggleExpandAllGroups, toggleView, selectedView }) {
  return (
    <>
      <div className='flex gap-2 justify-between items-center mt-3 text-2xl'>
        <div
          className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
          onClick={() => toggleExpandAllGroups(!(expandedGroups.length > 0))}
        >
          {
            expandedGroups.length > 0 ?
            <BiCollapse title='Collapse All' />
            :
            <BiExpand title='Expand All' />
          }
        </div>
        <div
          className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:bg-gray-100 cursor-pointer'
          onClick={() => toggleView()}
        >
          { selectedView === 'List' &&
            <>
              <BiListUl title='List View' />
              <span className='text-base'>List View</span>
            </>
          }
          { selectedView === 'Grid' &&
            <>
              <BiGridAlt title='Grid View' /> 
              <span className='text-base'>Grid View</span>
            </>
          }
        </div>
      </div>
    </>
  )
}