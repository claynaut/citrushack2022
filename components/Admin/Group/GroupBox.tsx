import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md'
import { BiTrash, BiGroup } from 'react-icons/bi'
import Modal from '@/components/Modal'

export function GroupBox({ group, expandedGroups, setExpandedGroups }) {
  const router = useRouter()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [selectedUser, setSelectedUser] = useState({ name: { first: '', last: '' }})
  const [currentGroup, setCurrentGroup] = useState({ gid: '' })

  const deleteUser = (user) => {
    axios.post('/api/groups/remove', { user, gid: currentGroup.gid })
    .then(() => {
      toast.success(
        'Successfully removed user!',
        { id: 'removeUserFromGroupSuccess' }
      )
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'removeUserFromGroupError' }
      )
    })
  }

  return (
    <>
      <motion.div 
        whileHover={{ y: -2 }}
        className='relative group'
      >
        <div
          className={
            'w-full border-2 border-sub rounded-md bg-card shadow-md cursor-pointer transform-gpu transition-size duration-150 overflow-hidden '
            + (!expandedGroups.includes(group) ? 'max-h-[2.75rem] ' : 'max-h-[20rem] ')
          }
        >
          <div className='flex'>
            <div className='mr-3'>
              <div 
                className='w-10 p-2 rounded-full text-2xl hover:bg-sub'
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
              className='flex items-center justify-between w-full mr-4'
              onClick={() => setExpandedGroups(
                  expandedGroups.includes(group) ? 
                  expandedGroups.filter(expandedGroup => expandedGroup !== group) :
                  expandedGroups.concat([group])
                )
              }
            >
              <span className='py-2 text-xs sm:text-sm md:text-base'>
                {group.gid}
              </span>
              <span className='flex items-center gap-1.5 py-2 text-sm md:text-base'>
                {group.users.length} 
                <div className='block md:hidden text-lg'><BiGroup /></div>
                <span className='hidden md:block'>member{group.users.length > 1 && 's'}</span>
              </span>
            </div>
          </div>
          <div className='border-t-2 border-sub text-xs md:text-sm'>
            <div className='flex w-full'>
              <div className='w-10 p-2 border-b-2 border-sub text-center'>#</div>
              <div className='w-full grid grid-cols-12 py-1.5 gap-4 border-b-2 border-sub'>
                <div className='col-span-12 xs:col-span-4'>Name</div>
                <div className='hidden sm:block col-span-4'>Email</div>
                <div className='hidden xs:block col-span-8 sm:col-span-4'>UID</div>
              </div>
              <div className='w-10 p-2 border-b-2 border-sub text-center'/>
            </div>
            {
              group.users.map((user, idx) =>
                <div key={'groupMember'+user.id} className='flex w-full'>
                  <div
                    className={
                      'w-10 p-2 text-center '
                      + (idx+1 < group.users.length ? 'border-b-2 border-sub' : '')
                    }
                  >
                    {idx+1}
                  </div>
                  <div
                    className={
                      'w-full grid grid-cols-12 py-2 gap-4 '
                      + (idx+1 < group.users.length ? 'border-b-2 border-sub' : '')
                    }
                  >
                    <div className='col-span-12 xs:col-span-4'>
                      {user.name.first + ' ' + user.name.last}
                      <span className='block xs:hidden'>
                        (UID: {user.id})
                      </span>
                    </div>
                    <div className='hidden sm:block sm:col-span-4'>{user.email}</div>
                    <div className='hidden xs:block col-span-8 sm:col-span-4'>{user.id}</div>
                  </div>
                  <div
                    className={
                      'text-center text-lg md:text-xl '
                      + (idx+1 < group.users.length ? 'border-b-2 border-sub' : '')
                    }
                  >
                    <div
                      className='w-9 p-2 rounded-full hover:bg-red-200 hover:text-red-600'
                      onClick={() => {setSelectedUser(user); setCurrentGroup(group); setConfirmDelete(true)}}
                    >
                      <BiTrash title='Remove' />
                    </div>
                  </div>
                </div>
            )}
          </div>
        </div>
      </motion.div>
      <Modal
        show={confirmDelete}
        handler={setConfirmDelete}
        title='Confirm Action'
        description={'Are you sure you want to remove ' + selectedUser.name.first + ' ' + selectedUser.name.last + ' from group ' + currentGroup.gid + '?'}
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-red-500 text-white cursor-pointer'
            onClick={() => { deleteUser(selectedUser); setConfirmDelete(false) }}
          >
            Remove {selectedUser.name.first + ' ' + selectedUser.name.last}
          </motion.button>
        </div>
      </Modal>
    </>
  )
}