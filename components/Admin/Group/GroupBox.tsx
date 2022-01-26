import { motion } from 'framer-motion'
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'

export function GroupBox({ group, expandedGroups, setExpandedGroups }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className='relative group'
    >
      <div
        className={
          'border-2 rounded-md bg-white shadow-md cursor-pointer transition-size duration-150 overflow-hidden '
          + (!expandedGroups.includes(group) ? 'h-11 ' : ' ')
          + ((expandedGroups.includes(group) && group.users.length === 1) ? 'h-[7.625rem] ' : ' ')
          + ((expandedGroups.includes(group) && group.users.length === 2) ? 'h-40 ' : ' ')
          + ((expandedGroups.includes(group) && group.users.length === 3) ? 'h-[12.375rem] ' : ' ')
          + ((expandedGroups.includes(group) && group.users.length === 4) ? 'h-[14.75rem] ' : ' ')
        }
      >
        <div className='flex'>
          <div className='mr-3'>
            <div 
              className='w-10 p-2 rounded-full text-2xl hover:bg-gray-100'
              onClick={() => setExpandedGroups(
                  expandedGroups.includes(group) ? 
                  expandedGroups.filter(expandedGroup => expandedGroup !== group) :
                  expandedGroups.concat([group])
                )
              }
            >
              {
                expandedGroups.includes(group) ?
                <MdArrowDropDown title='Collapse'/>
                :
                <MdArrowRight title='Expand'/>
              }
            </div>
          </div>
          <div 
            className='flex justify-between w-full mr-4'
            onClick={() => setExpandedGroups(
                expandedGroups.includes(group) ? 
                expandedGroups.filter(expandedGroup => expandedGroup !== group) :
                expandedGroups.concat([group])
              )
            }
          >
            <div className='py-2'>
              {group.gid}
            </div>
            <div className='py-2'>
              {group.users.length} member{group.users.length > 1 && 's'}
            </div>
          </div>
        </div>
        <div className='border-t-2 text-sm'>
          <div className='flex w-full'>
            <div className='w-10 p-2 border-b-2 text-center'>#</div>
            <div className='w-full grid grid-cols-12 py-1.5 border-b-2'>
              <div className='col-span-4'>Name</div>
              <div className='col-span-4'>Email</div>
              <div className='col-span-4'>UID</div>
            </div>
            <div className='w-10 p-2 border-b-2 text-center'/>
          </div>
          {
            group.users.map((user, idx) =>
              <div className='flex w-full'>
                <div
                  className={
                    'w-10 p-2 text-center '
                    + (idx+1 < group.users.length ? 'border-b-2' : '')
                  }
                >
                  {idx+1}
                </div>
                <div
                  className={
                    'w-full grid grid-cols-12 py-2 '
                    + (idx+1 < group.users.length ? 'border-b-2' : '')
                  }
                >
                  <div className='col-span-4'>{user.name.first + ' ' + user.name.last}</div>
                  <div className='col-span-4'>{user.email}</div>
                  <div className='col-span-4'>{user.id}</div>
                </div>
                <div
                  className={
                    'text-center text-xl '
                    + (idx+1 < group.users.length ? 'border-b-2' : '')
                  }
                >
                  <div className='w-9 p-2 rounded-full hover:bg-red-100 hover:text-red-600'>
                    <BiTrash />
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}