import React, { useState } from 'react'
import useSWR from 'swr'
import ProtectedPage from '@/components/ProtectedPage'
import { motion } from 'framer-motion'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiDetail,
  BiX,
  BiExpand,
  BiCollapse
} from 'react-icons/bi'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Landing() {
  const { data, error } = useSWR('/api/users/query', fetcher)
  const [selectedView, setSelectedView] = useState('All Users')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [expandedUsers, setExpandedUsers] = useState([])

  const viewOptions = [
    'All Users',
    'Not Applied',
    'Pending',
    'Approved',
    'Rejected',
  ]

  const selectView = (view: string) => {
    setAllSelected(false)
    setSelectedUsers([])
    setSelectedView(view)
    setExpandedUsers([])
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

  const toggleExpandAllUsers = (expandAll: boolean) => {
    if (expandAll) {
      if (selectedView === 'All Users') {
        setExpandedUsers(data.users)
      }
      else if (selectedView === 'Not Applied') {
        setExpandedUsers(data.users.filter(user => !user.uid))
      }
      else if (selectedView === 'Pending') {
        setExpandedUsers(data.users.filter(user => user.qualified === ''))
      }
      else if (selectedView === 'Approved') {
        setExpandedUsers(data.users.filter(user => user.qualified === 'yeah'))
      }
      else if (selectedView === 'Rejected') {
        setExpandedUsers(data.users.filter(user => user.qualified === 'nope'))
      }
    }
    else {
      setExpandedUsers([])
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
          <div className='grid grid-cols-5 gap-2'>
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
          {/* all users */}
          {
            selectedView === viewOptions[0] &&
            <div className='flex flex-col gap-2 mt-3'>
              <div className='grid grid-cols-12 rounded-md bg-gray-300 font-semibold'>
                <div className='col-start-3 col-span-8 py-2'>
                  Email
                </div>
              </div>
              { data.users.map((user, idx) =>
                <motion.div 
                whileHover={{ y: -2 }}
                  className='relative group'
                >
                  <div
                    className={
                      'border-2 rounded-md bg-white shadow-md cursor-pointer transition-size duration-150 overflow-hidden '
                      + (selectedUsers.includes(user) ? 'border-accent-primary ' : ' ')
                      + (expandedUsers.includes(user) ? 'h-60' : 'h-11')
                    }
                  >
                    <div className='grid grid-cols-12'>
                      <div>
                        <div 
                          className={
                            'max-w-min p-2 rounded-full hover:bg-gray-100 text-2xl group-hover:text-black '
                            + (selectedUsers.includes(user) ? 'text-black' : 'text-gray-400')
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
                      <div className='col-start-3 col-span-8 py-2'>
                        {user.email}
                      </div>
                      <div className='flex items-center col-span-2 py-1 text-sm font-semibold'>
                        {
                          user.qualified === '' &&
                          <div className='rounded-full bg-gray-200 text-gray-500 p-1 px-2'>
                            PENDING
                          </div>
                        }
                        {
                          user.qualified === 'yeah' &&
                          <div className='rounded-full bg-green-200 text-green-700 p-1 px-2'>
                            APPROVED
                          </div>
                        }
                        {
                          user.qualified === 'nope' &&
                          <div className='rounded-full bg-red-200 text-red-700 p-1 px-2'>
                            REJECTED
                          </div>
                        }
                      </div>
                    </div>
                    <div className='py-4 border-t-2'>
                      { user.uid ?
                        <div className='grid grid-cols-12'>
                          <div className='col-start-3 col-span-10'>
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
                              <li>
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
                        <div className='text-center text-gray-400'>
                          No information available yet. User has yet to apply.
                        </div>
                      }
                    </div>
                  </div>
                  <div className='absolute top-[-1px] right-[-3rem] invisible group-hover:visible pl-2 cursor-default'>
                    {
                      expandedUsers.includes(user) ?
                      <div
                        className='p-2 border-2 hover:border-accent-primary rounded-md bg-white shadow-md text-2xl text-gray-400 hover:text-accent-primary cursor-pointer'
                        onClick={() => setExpandedUsers(expandedUsers.filter(expandedUser => expandedUser !== user))}
                      >
                        <BiX title='Close Details'/>
                      </div>
                      :

                      <div
                        className='p-2 border-2 hover:border-accent-primary rounded-md bg-white shadow-md text-2xl text-gray-400 hover:text-accent-primary cursor-pointer'
                        onClick={() => setExpandedUsers(expandedUsers.concat([user]))}
                      >
                        <BiDetail title='View Details'/>
                      </div>
                    }
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
