import { motion } from 'framer-motion'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiTask,
  BiTaskX
} from 'react-icons/bi'

export function UserBox({
  user, 
  selectedUsers, 
  setSelectedUsers, 
  expandedUsers, 
  setExpandedUsers, 
  pending
}) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className='relative group'
    >
      <div
        className={
          'border-2 rounded-md bg-white shadow-md cursor-pointer transition-size duration-150 overflow-hidden '
          + (selectedUsers.includes(user) ? 'border-gray-500 ' : ' ')
          + (expandedUsers.includes(user) ? 'h-56 ' : 'h-11 ')
          + (pending && (user.criteriaMet ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'))
        }
      >
        <div className='flex'>
          <div>
            <div 
              className={
                'max-w-min p-2 rounded-full text-2xl group-hover:text-black '
                + (!pending ? 'hover:bg-gray-100 ' : (user.criteriaMet ? 'hover:bg-green-200 ' : 'hover:bg-red-200 '))
                + (selectedUsers.includes(user) ? 'text-black' : (pending ? (user.criteriaMet ? 'text-green-300' : 'text-red-300') : 'text-gray-400' ))
              }
              onClick={
                () => setSelectedUsers(
                  selectedUsers.includes(user) ? 
                    selectedUsers.filter(selectedUser => selectedUser !== user) :
                    selectedUsers.concat([user])
                )
              }
            >
              {
                selectedUsers.includes(user) ?
                <BiCheckboxSquare title='Select'/>
                :
                <BiCheckbox title='Select'/>
              }
            </div>
          </div>
          <div 
            className='grid grid-cols-12'
            onClick={() => setExpandedUsers(
              expandedUsers.includes(user) ?
              expandedUsers.filter(expandedUser => expandedUser !== user) :
              expandedUsers.concat([user])
            )}
          >
            <div className='flex items-center col-span-2 px-6 py-1 text-center text-sm font-semibold uppercase'>
              {
                user.qualified === '' &&
                <div 
                  className={
                    'rounded-full p-1 px-2 w-full '
                    + (pending ? (user.criteriaMet ? 'bg-green-100 border-2 border-green-200 text-green-500' : 'bg-red-100 border-2 border-red-200 text-red-500') : 'bg-amber-100 text-amber-500')
                  }
                >
                  Pending
                </div>
              }
              {
                user.qualified === 'yeah' &&
                <div className='rounded-full bg-green-200 text-green-700 p-1 px-2 w-full'>
                  Approved
                </div>
              }
              {
                user.qualified === 'nope' &&
                <div className='rounded-full bg-red-200 text-red-700 p-1 px-2 w-full'>
                  Rejected
                </div>
              }
            </div>
            <div className='py-2'>
              {user.email}
            </div>
          </div>
        </div>
        <div 
          className={
            'py-4 border-t-2 '
            + (pending && (user.criteriaMet ? 'border-green-300' : 'border-red-300'))
          }
        >
          { user.uid ?
            <div className='grid grid-cols-12'>
              <div className='col-start-3 col-span-9 ml-8'>
                <ul>
                  <li>
                    <b>UID:</b> {user.uid}
                  </li>
                  <li>
                    <b>Full Name:</b> {user.name.first} {user.name.last}
                  </li>
                  <li>
                    <b>School:</b> {user.school}
                  </li>
                  <li>
                    <b>Grade:</b> {user.grade}
                  </li>
                  <li className={(pending ? (user.criteriaMet ? 'text-green-500' : 'text-red-500') : 'text-black')}>
                    <b>Graduation Date:</b> {user.graduationDate}
                  </li>
                  <li>
                    <b>App Status: </b>
                    { user.qualified === '' && (user.criteriaMet ?
                      'Pending Approval'
                      :
                      'Pending Rejection'
                    )}
                    { user.qualified !== '' && (user.qualified === 'yeah' ?
                      'Approved'
                      :
                      'Rejected'
                    )}
                  </li>
                </ul>
              </div>
            </div>
            :
            <div className='mt-14 text-center text-gray-400'>
              No information available yet. User has yet to apply.
            </div>
          }
        </div>
      </div>
      { pending &&
        <div className='absolute top-[-1px] right-[-6rem] invisible group-hover:visible flex gap-1 pl-2 cursor-default'>
          <div
            className='p-2 border-2 hover:border-green-500 rounded-md bg-white shadow-md text-2xl text-gray-400 hover:text-green-500 cursor-pointer'
          >
            <BiTask title='Approve'/> 
          </div>
          <div
            className='p-2 border-2 hover:border-red-500 rounded-md bg-white shadow-md text-2xl text-gray-400 hover:text-red-500 cursor-pointer'
          >
            <BiTaskX title='Reject'/> 
          </div>
        </div>
      }
    </motion.div>
  )
}