import { motion } from 'framer-motion'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiLoaderCircle,
  BiUserCheck,
  BiUserX
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
          'h-full border-2 border-sub rounded-md bg-card shadow-md cursor-pointer transform-gpu transition-size duration-150 overflow-hidden '
          + (selectedUsers.includes(user) ? 'border-text ' : ' ')
          + (expandedUsers.includes(user) ? 'max-h-[40rem] ' : 'max-h-[2.75rem] ')
          + (pending && (user.criteriaMet ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'))
        }
      >
        <div className='flex items-center'>
          <div>
            <div 
              className={
                'w-10 p-2 rounded-full text-2xl group-hover:text-text '
                + (!pending ? 'hover:bg-sub ' : (user.criteriaMet ? 'hover:bg-green-200 ' : 'hover:bg-red-200 '))
                + (selectedUsers.includes(user) ? 'text-text' : (pending ? (user.criteriaMet ? 'text-green-300' : 'text-red-300') : 'text-sub' ))
              }
              onClick={() => setSelectedUsers(
                  selectedUsers.includes(user) ? 
                  selectedUsers.filter(selectedUser => selectedUser !== user) :
                  selectedUsers.concat([user])
                )
              }
            >
              {
                selectedUsers.includes(user) ?
                <BiCheckboxSquare title='Deselect'/>
                :
                <BiCheckbox title='Select'/>
              }
            </div>
          </div>
          <div 
            className='flex'
            onClick={() => setExpandedUsers(
              expandedUsers.includes(user) ?
              expandedUsers.filter(expandedUser => expandedUser !== user) :
              expandedUsers.concat([user])
            )}
          >
            <div className='flex items-center w-10 md:w-28 pr-2 py-1 text-center text-xs md:text-sm font-semibold uppercase'>
              {
                user.qualified === '' &&
                <div 
                  className={
                    'flex items-center justify-center rounded-full p-1 px-2 w-full '
                    + (pending ? (user.criteriaMet ? 'bg-green-100 border-2 border-green-200 text-green-600' : 'bg-red-100 border-2 border-red-200 text-red-500') : 'bg-amber-100 text-amber-500')
                  }
                >
                  <div className='flex md:hidden text-lg'><BiLoaderCircle /></div> 
                  <span className='hidden md:flex'>Pending</span>
                </div>
              }
              {
                user.qualified === 'yeah' &&
                <div className='flex items-center justify-center rounded-full bg-green-200 text-green-700 p-1 px-2 w-full'>
                  <div className='flex md:hidden text-lg'><BiUserCheck /></div> 
                  <span className='hidden md:flex'>Approved</span>
                </div>
              }
              {
                user.qualified === 'nope' &&
                <div className='flex items-center justify-center rounded-full bg-red-200 text-red-700 p-1 px-2 w-full'>
                  <div className='flex md:hidden text-lg'><BiUserX /></div> 
                  <span className='hidden md:flex'>Rejected</span>
                </div>
              }
            </div>
            <span className='py-2 text-sm md:text-base'>
              {user.email}
            </span>
          </div>
        </div>
        <div 
          className={
            'py-4 border-t-2 border-sub '
            + (pending && (user.criteriaMet ? 'border-green-300' : 'border-red-300'))
          }
        >
          { user.uid ?
            <div className='flex'>
              <div className='ml-10'>
                <ul>
                  <li className='text-sm md:text-base'>
                    <b>UID:</b> {user.uid}
                  </li>
                  <li className='text-sm md:text-base'>
                    <b>Full Name:</b> {user.name.first} {user.name.last}
                  </li>
                  <li className='text-sm md:text-base'>
                    <b>School:</b> {user.school}
                  </li>
                  <li className='text-sm md:text-base'>
                    <b>Grade:</b> {user.grade}
                  </li>
                  <li className={'text-sm md:text-base ' + (pending ? (user.criteriaMet ? 'text-green-500' : 'text-red-500') : '')}>
                    <b>Graduation Date:</b> {user.graduationDate}
                  </li>
                  <li className='text-sm md:text-base'>
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
                  <li className='text-sm md:text-base'>
                    <b>Participation:</b> {user.participation}
                  </li>
                  { user.checkedIn &&
                    <li className='text-sm md:text-base'>
                      <b>Address:</b> {user.address}
                    </li>
                  }
                </ul>
              </div>
            </div>
            :
            <p className='m-0 mx-4 text-center text-sm md:text-base'>
              No information available yet. User has yet to apply.
            </p>
          }
        </div>
      </div>
    </motion.div>
  )
}