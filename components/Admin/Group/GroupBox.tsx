import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { MdArrowRight, MdArrowDropDown } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
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
                <div key={'groupMember'+user.id} className='flex w-full'>
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
                    <div
                      className='w-9 p-2 rounded-full hover:bg-red-100 hover:text-red-600'
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