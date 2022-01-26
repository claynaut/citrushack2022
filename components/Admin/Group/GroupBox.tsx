import { motion } from 'framer-motion'
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md'

export function GroupBox({ group, expandedGroups, setExpandedGroups }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className='relative group'
    >
      <div
        className={
          'border-2 rounded-md bg-white shadow-md cursor-pointer transition-size duration-150 overflow-hidden '
          + (expandedGroups.includes(group) ? 'h-56 ' : 'h-11 ')
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
        <div className='py-4 border-t-2'>
          <div className='mt-14 text-center text-gray-400'>
            No information available yet. User has yet to apply.
          </div>
        </div>
      </div>
    </motion.div>
  )
}