import React, { useState } from 'react'
import useSWR from 'swr'
import { BiSearch, BiX } from 'react-icons/bi'
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
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)
  
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

  // regex for searching users by uid, email, or name
  const regex = /(uid|email|name):\s*[a-zA-Z0-9._]+/

  // check if a search matches
  const userMatch = (user) => {
    var uidMatch = true
    var emailMatch = true
    var nameMatch = true
    var match = true
    if (searchQuery.uid) {
      if (!(user.uid && user.uid.includes(searchQuery.uid))) { uidMatch = false }
    }
    if (searchQuery.email) {
      if (!(user.email && user.email.toLowerCase().includes(searchQuery.email.toLowerCase()))) { emailMatch = false }
    }
    if (searchQuery.name) {
      if (user.name && user.name.first && user.name.last) {
        var full_name = user.name.first + ' ' + user.name.last
        if (!(full_name.toLowerCase().includes(searchQuery.name.toLowerCase()))) { nameMatch = false }
      }
      else { nameMatch = false }
    }
    if (!uidMatch || !emailMatch || !nameMatch) { match = false }
    return match
  }

  const handleSearchFilter = (e) => {
    setSearchFilter(e.target.value)
    const queries = e.target.value.split(',')
    var validQueries = ''
    var numPassed = 0
    for (let i = 0; i < queries.length; i++) {
      if(regex.test(queries[i])) {
        var query = queries[i].split(':')
        if (validQueries === '') {
          validQueries += '{"' + query[0].replace(/\s+/, '') + '": "' + query[1].replace(/\s+/, '') + '"'
        }
        else {
          validQueries += ', "' + query[0].replace(/\s+/, '') + '": "' + query[1].replace(/\s+/, '') + '"'
        }
        if (i === queries.length-1) {
          validQueries += '}'
        }
        numPassed += 1
      }
    }
    if (numPassed === queries.length) {
      setSearchQuery(JSON.parse(validQueries))
      setValidSearch(true)
    }
    else {
      setSearchQuery(Object)
      setValidSearch(false)
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
          <h3 className='w-full my-8 font-medium'>Overview</h3>
          <div className='mb-4'>
            <div className='w-full flex items-center pl-2 border-2 rounded-md'>
              <BiSearch className='text-2xl text-gray-500'/>
              <input
                className='w-full ml-2 py-2 outline-0'
                value={searchFilter}
                onChange={handleSearchFilter}
              />
              { searchFilter.length > 0 &&
                <div
                  className='p-2 rounded-full text-2xl text-gray-500 hover:bg-gray-50 cursor-pointer'
                  onClick={() => { setSearchFilter(''); setSearchQuery('') }}
                >
                  <BiX title='Clear Search' />
                </div>
              }
            </div>
            { searchFilter.length > 0 && !validSearch &&
              <p className='p-0 text-sm'>Not a valid search.</p>
            }
          </div>
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
              { !validSearch && data.users.map((user, idx) =>
                <UserBox
                  key={'allUsers'+String(idx)}
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
              { validSearch && data.users.filter(user => userMatch(user)).map((user, idx) =>
                <UserBox
                  key={'searchedAllUsers'+String(idx)}
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
              { !validSearch && data.users.filter(user => !user.uid).map((user, idx) =>
                <UserBox
                  key={'notAppliedUsers'+String(idx)}
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
              { validSearch && data.users.filter(user => !user.uid && userMatch(user)).map((user, idx) =>
                <UserBox
                  key={'searchedNotAppliedUsers'+String(idx)}
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
              { !validSearch && data.users.filter(user => user.qualified === '').map((user, idx) =>
                <UserBox
                  key={'pendingUsers'+String(idx)}
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(true)}
                />
              )}
              { validSearch && data.users.filter(user => user.qualified === '' && userMatch(user)).map((user, idx) =>
                <UserBox
                  key={'searchedPendingUsers'+String(idx)}
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
              { !validSearch && data.users.filter(user => user.qualified === 'yeah').map((user, idx) =>
                <UserBox
                  key={'approvedUsers'+String(idx)}
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
              { validSearch && data.users.filter(user => user.qualified === 'yeah' && userMatch(user)).map((user, idx) =>
                <UserBox
                  key={'searchedApprovedUsers'+String(idx)}
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
              { !validSearch && data.users.filter(user => user.qualified === 'nope').map((user, idx) =>
                <UserBox
                  key={'rejectedUsers'+String(idx)}
                  user={user}
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  expandedUsers={expandedUsers}
                  setExpandedUsers={setExpandedUsers}
                  pending={Boolean(false)}
                />
              )}
              { validSearch && data.users.filter(user => user.qualified === 'nope' && userMatch(user)).map((user, idx) =>
                <UserBox
                  key={'searchedRejectedUsers'+String(idx)}
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
