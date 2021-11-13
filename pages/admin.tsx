import React, { useState } from 'react'
import useSWR from 'swr'
import ProtectedPage from '@/components/ProtectedPage'
import { motion } from 'framer-motion'
import { BiCheckbox, BiCheckboxSquare } from 'react-icons/bi'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Landing() {
  const { data, error } = useSWR('/api/users/query', fetcher)
  const [selectedView, setSelectedView] = useState('All Users')
  const [selectedUsers, setSelectedUsers] = useState([{}])
  const [allSelected, setAllSelected] = useState(false)

  const viewOptions = [
    'All Users',
    'Not Applied',
    'Pending',
    'Approved',
    'Rejected',
  ]

  const toggleAllSelected = (users) => {
    setAllSelected(!allSelected)
    setSelectedUsers(users)
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
                onClick={() => setSelectedView(option)}
              >
                {option}
              </motion.button>
            )}
          </div>
          {
            selectedView === viewOptions[0] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300'>
                <div className='text-2xl'>
                  {
                    allSelected ?
                    <BiCheckboxSquare className='cursor-pointer' onClick={() => toggleAllSelected([{}])}/>
                    :
                    <BiCheckbox className='cursor-pointer' onClick={() => toggleAllSelected(data.users)}/>
                  }
                </div>
                <div className='col-span-3'>
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
                    'group grid grid-cols-7 p-2 border-2 rounded-md bg-white shadow-md cursor-pointer '
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
                      <BiCheckboxSquare onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-3'>
                    {user.uid ? user.uid : 'null'}
                  </div>
                  <div className='col-span-3'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {
            selectedView === viewOptions[1] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300'>
                <div className='text-2xl'>
                  {
                    allSelected ?
                    <BiCheckboxSquare className='cursor-pointer' onClick={() => toggleAllSelected([{}])}/>
                    :
                    <BiCheckbox className='cursor-pointer' onClick={() => toggleAllSelected(data.users)}/>
                  }
                </div>
                <div className='col-span-6'>
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
                      <BiCheckboxSquare onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {
            selectedView === viewOptions[2] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300'>
                <div className='text-2xl'>
                  {
                    allSelected ?
                    <BiCheckboxSquare className='cursor-pointer' onClick={() => toggleAllSelected([{}])}/>
                    :
                    <BiCheckbox className='cursor-pointer' onClick={() => toggleAllSelected(data.users)}/>
                  }
                </div>
                <div className='col-span-6'>
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
                      <BiCheckboxSquare onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {
            selectedView === viewOptions[3] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300'>
                <div className='text-2xl'>
                  {
                    allSelected ?
                    <BiCheckboxSquare className='cursor-pointer' onClick={() => toggleAllSelected([{}])}/>
                    :
                    <BiCheckbox className='cursor-pointer' onClick={() => toggleAllSelected(data.users)}/>
                  }
                </div>
                <div className='col-span-6'>
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
                      <BiCheckboxSquare onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
                    }
                  </div>
                  <div className='col-span-6'>
                    {user.email}
                  </div>
                </motion.div>
              )}
            </div>
          }
          {
            selectedView === viewOptions[4] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-7 p-2 rounded-md bg-gray-300'>
                <div className='text-2xl'>
                  {
                    allSelected ?
                    <BiCheckboxSquare className='cursor-pointer' onClick={() => toggleAllSelected([{}])}/>
                    :
                    <BiCheckbox className='cursor-pointer' onClick={() => toggleAllSelected(data.users)}/>
                  }
                </div>
                <div className='col-span-6'>
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
                      <BiCheckboxSquare onClick={() => setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user))}/>
                      :
                      <BiCheckbox onClick={() => setSelectedUsers(selectedUsers.concat([user]))}/>
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
