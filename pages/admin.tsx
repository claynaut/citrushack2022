import React, { useState } from 'react'
import useSWR from 'swr'
import ProtectedPage from '@/components/ProtectedPage'
import { motion } from 'framer-motion'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiDetail,
  BiX,
  BiDotsVerticalRounded
} from 'react-icons/bi'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Landing() {
  const { data, error } = useSWR('/api/users/query', fetcher)
  const [selectedView, setSelectedView] = useState('All Users')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [expandedUser, setExpandedUser] = useState({})

  const viewOptions = [
    'All Users',
    'Not Applied',
    'Pending',
    'Approved',
    'Rejected',
  ]

  const selectView = (view: string) => {
    setAllSelected(false)
    setSelectedUsers([{}])
    setSelectedView(view)
  }

  const toggleSelectAllUsers = (selectAll: boolean) => {
    setAllSelected(selectAll)
    if (selectAll) {
      if (selectedView === 'All Users') {
        setSelectedUsers(data.users)
      }
      else if (selectedView === 'Not Applied') {
        setSelectedUsers(data.users.filter(user => !user.uid))
      }
      else if (selectedView === 'Pending') {
        setSelectedUsers(data.users.filter(user => user.qualified === ''))
      }
      else if (selectedView === 'Approved') {
        setSelectedUsers(data.users.filter(user => user.qualified === 'yeah'))
      }
      else if (selectedView === 'Rejected') {
        setSelectedUsers(data.users.filter(user => user.qualified === 'nope'))
      }
    }
    else {
      setSelectedUsers([])
    }
  }

  if (error) 
    return (
      <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
        <section className='flex flex-col w-full justify-center items-center'>
          Error...
        </section>
      </ProtectedPage>
    )

  if (!data) 
    return (
      <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
        <section className='flex flex-col w-full justify-center items-center'>
          Loading...
        </section>
      </ProtectedPage>
    )

  return (
    <ProtectedPage title='Admin' restrictions={['signin', 'admin']}>
      <section className='flex w-full my-24 items-center'>
        <div className='flex flex-col w-full'>
          <h2>Admin Dashboard</h2>
          <h3>Statistics</h3>
          <ul className='ml-5 list-disc'>
            <li>
              Total users signed up: { Object.keys(data.users).length }
            </li>
            <li>
              Total users not applied: { Object.keys(data.users.filter(user => !user.uid)).length }
            </li>
            <li>
              Total pending applications: { Object.keys(data.users.filter(user => user.qualified === '')).length }
            </li>
            <li>
              Total approved applications: { Object.keys(data.users.filter(user => user.qualified === 'yeah')).length }
            </li>
            <li>
              Total rejected applications: { Object.keys(data.users.filter(user => user.qualified === 'nope')).length }
            </li>
          </ul>
          <h3>View Options</h3>
          <div className='grid grid-cols-5 gap-4'>
            { viewOptions.map((option) =>
              <motion.button
                whileHover={{ scale: 1.03}} 
                whileTap={{ scale: 0.995 }}
                className={
                  'py-1.5 rounded font-semibold text-white '
                  + (selectedView === option ? 'bg-accent-primary hover:bg-accent-primary-dark' : 'bg-gray-300 hover:bg-gray-400')
                }
                onClick={() => selectView(option)}
              >
                {option}
              </motion.button>
            )}
          </div>
          <div className='flex mt-3 text-2xl'>
            <div className='p-2 cursor-pointer' onClick={() => toggleSelectAllUsers(!allSelected)}>
              {
                allSelected ? <BiCheckboxSquare title='Select' /> : <BiCheckbox title='Select' />
              }
            </div>
            <div className='p-2 cursor-pointer'>
              <BiDotsVerticalRounded title='More Options' onClick={() => console.log(selectedUsers)} />
            </div>
          </div>
          {/* all users */}
          {
            selectedView === viewOptions[0] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300 font-semibold'>
                <div className='col-start-2 col-span-3'>
                  UID
                </div>
                <div className='col-span-3'>
                  Email
                </div>
              </div>
              { data.users.map((user, idx) =>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={
                    'relative group grid grid-cols-7 p-2 border-2 rounded-md bg-white shadow-md cursor-pointer '
                    + (selectedUsers.includes(user) ? 'border-accent-primary' : '')
                  }
                >
                  <div 
                    className={
                      'text-2xl group-hover:text-black '
                      + (selectedUsers.includes(user) ? 'text-black' : 'text-gray-400')
                    }
                  >
                    {
                      selectedUsers.includes(user) ?
                      <BiCheckboxSquare title='Select' onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox title='Select' onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-3'>
                    {user.uid ? user.uid : 'null'}
                  </div>
                  <div className='col-span-3'>
                    {user.email}
                  </div>
                  <div className='absolute bottom-[-1px] right-[-3.25rem] invisible group-hover:visible pl-2 cursor-default'>
                    <div className='p-2 border-2 hover:border-accent-primary rounded-md bg-white shadow-md text-gray-400 hover:text-accent-primary cursor-pointer'>
                      <BiDetail title='View Details' className='text-2xl'/>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          }
          {/* users who haven't applied yet */}
          {
            selectedView === viewOptions[1] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300 font-semibold'>
                <div className='col-start-2 col-span-6'>
                  Email
                </div>
              </div>
              { data.users.filter(user => !user.uid).map((user, idx) =>
                <motion.div
                  whileHover={{ y: -2 }}
                  className='grid grid-cols-7 p-2 border-2 rounded-md bg-white shadow-md'
                >
                  <div 
                    className={
                      'text-2xl group-hover:text-black '
                      + (selectedUsers.includes(user) ? 'text-black' : 'text-gray-400')
                    }
                  >
                    {
                      selectedUsers.includes(user) ?
                      <BiCheckboxSquare title='Select' onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox title='Select' onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {/* pending applications */}
          {
            selectedView === viewOptions[2] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300 font-semibold'>
                <div className='col-start-2 col-span-6'>
                  Email
                </div>
              </div>
              { data.users.filter(user => user.qualified === '' ).map((user, idx) =>
                <motion.div
                  whileHover={{ y: -2 }}
                  className='grid grid-cols-7 p-2 border-2 rounded-md bg-white shadow-md'
                >
                  <div 
                    className={
                      'text-2xl group-hover:text-black '
                      + (selectedUsers.includes(user) ? 'text-black' : 'text-gray-400')
                    }
                  >
                    {
                      selectedUsers.includes(user) ?
                      <BiCheckboxSquare title='Select' onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox title='Select' onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {/* approved hackers */}
          {
            selectedView === viewOptions[3] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300 font-semibold'>
                <div className='col-start-2 col-span-6'>
                  Email
                </div>
              </div>
              { data.users.filter(user => user.qualified === 'yeah' ).map((user, idx) =>
                <motion.div
                  whileHover={{ y: -2 }}
                  className='grid grid-cols-7 p-2 border-2 rounded-md bg-white shadow-md'
                >
                  <div 
                    className={
                      'text-2xl group-hover:text-black '
                      + (selectedUsers.includes(user) ? 'text-black' : 'text-gray-400')
                    }
                  >
                    {
                      selectedUsers.includes(user) ?
                      <BiCheckboxSquare title='Select' onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox title='Select' onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {/* rejected applicants */}
          {
            selectedView === viewOptions[4] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300 font-semibold'>
                <div className='col-start-2 col-span-6'>
                  Email
                </div>
              </div>
              { data.users.filter(user => user.qualified === 'nope' ).map((user, idx) =>
                <motion.div
                  whileHover={{ y: -2 }}
                  className='grid grid-cols-7 p-2 border-2 rounded-md bg-white shadow-md'
                >
                  <div 
                    className={
                      'text-2xl group-hover:text-black '
                      + (selectedUsers.includes(user) ? 'text-black' : 'text-gray-400')
                    }
                  >
                    {
                      selectedUsers.includes(user) ?
                      <BiCheckboxSquare title='Select' onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox title='Select' onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
        </div>
      </section>
    </ProtectedPage>
  )
}
