import { BiExpand, BiCollapse } from 'react-icons/bi'

export function GroupActions({ expandedGroups, toggleExpandAllGroups}) {
  return (
    <>
      <div className='flex gap-2 items-center text-2xl'>
        <div
          className='p-2 rounded-full hover:bg-sub cursor-pointer'
          onClick={() => toggleExpandAllGroups(!(expandedGroups.length > 0))}
        >
          {
            expandedGroups.length > 0 ?
            <BiCollapse title='Collapse All' />
            :
            <BiExpand title='Expand All' />
          }
        </div>
      </div>
    </>
  )
}