import React, { useState } from 'react'
import useSWR from 'swr'
import ProtectedPage from '@/components/ProtectedPage'
import {
  UserBox,
  UserStatistics,
  ViewOptions,
  UserActions
} from '@/components/Admin'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function Landing() {
  const { data, error } = useSWR('/api/users/query', fetcher)
  const [selectedView, setSelectedView] = useState('All Users')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [expandedUsers, setExpandedUsers] = useState([])

  var numSignedUp = 0
  var numNotApplied = 0
  var numPending = 0
  var numApproved = 0
  var numRejected = 0

  if (data) {
    numSignedUp = Object.keys(data.users).length
    numNotApplied = Object.keys(data.users.filter(user => !user.uid)).length
    numPending = Object.keys(data.users.filter(user => user.qualified === '')).length
    numApproved = Object.keys(data.users.filter(user => user.qualified === 'yeah')).length
    numRejected = Object.keys(data.users.filter(user => user.qualified === 'nope')).length
  }

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
          <h2 className='mb-8 font-medium'>Dashboard</h2>
          <UserStatistics
            numSignedUp={numSignedUp}
            numNotApplied={numNotApplied}
            numPending={numPending}
            numApproved={numApproved}
            numRejected={numRejected}
          />
          <h3 className='my-8 font-medium'>Overview</h3>
          <ViewOptions
            viewOptions={viewOptions}
            selectedView={selectedView}
            selectView={selectView}
          />
          <UserActions
            allSelected={allSelected}
            toggleSelectAllUsers={toggleSelectAllUsers}
            expandedUsers={expandedUsers}
            toggleExpandAllUsers={toggleExpandAllUsers}
            selectedUsers={selectedUsers}
            selectedView={selectedView}
            viewOptions={viewOptions}
          />
          { /* all users */
            selectedView === viewOptions[0] &&
            <div className='flex flex-col gap-2 mt-3'>
              { data.users.map((user, idx) =>
                <UserBox
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
            </div>
          }
          { /* users who haven't applied yet */
            selectedView === viewOptions[1] &&
            <div className='flex flex-col gap-2 mt-3'>
              { data.users.filter(user => !user.uid).map((user, idx) =>
                <UserBox
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
            </div>
          }
          { /* pending applications */
            selectedView === viewOptions[2] &&
            <div className='flex flex-col gap-2 mt-3'>
              { data.users.filter(user => user.qualified === '' ).map((user, idx) =>
                <UserBox
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(true)}
                />
              )}
            </div>
          }
          { /* approved hackers */
            selectedView === viewOptions[3] &&
            <div className='flex flex-col gap-2 mt-3'>
              { data.users.filter(user => user.qualified === 'yeah' ).map((user, idx) =>
                <UserBox
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
            </div>
          }
          { /* rejected applicants */
            selectedView === viewOptions[4] &&
            <div className='flex flex-col gap-2 mt-3'>
              { data.users.filter(user => user.qualified === 'nope' ).map((user, idx) =>
                <UserBox
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
            </div>
          }
        </div>
      </section>
    </ProtectedPage>
  )
}
