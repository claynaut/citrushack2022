import {
  BiCheckbox,
  BiCheckboxSquare,
  BiExpand,
  BiCollapse
} from 'react-icons/bi'

export function UserActions({
  allSelected,
  toggleSelectAllUsers,
  expandedUsers,
  toggleExpandAllUsers
}) {
  return (
    <div className='flex mt-3 text-2xl'>
      <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer' onClick={() => toggleSelectAllUsers(!allSelected)}>
        {
          allSelected ? <BiCheckboxSquare title='Select All' /> : <BiCheckbox title='Select All' />
        }
      </div>
      <div className='p-2 rounded-full hover:bg-gray-100 cursor-pointer' onClick={() => toggleExpandAllUsers(!(expandedUsers.length > 0))}>
        {
          expandedUsers.length > 0 ?
          <BiCollapse title='Collapse All' />
          :
          <BiExpand title='Expand All' />
        }
      </div>
    </div>
  )
}