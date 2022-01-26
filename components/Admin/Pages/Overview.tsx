import React, { useState } from 'react'
import { BiSearch, BiX } from 'react-icons/bi'
import {
  UserBox,
  OverviewStats,
  Overviews,
  UserActions,
  Filter
} from '@/components/Admin'

export function Overview({ data }) {
  const [selectedView, setSelectedView] = useState('Pending')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [expandedUsers, setExpandedUsers] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)
  const [filter, setFilter] = useState('Default')
  const [sorted, setSorted] = useState(false)

  const viewOptions = [
    'Pending',
    'Not Applied',
    'Approved',
    'Rejected',
    'All Users',
  ]
  
  const makeFilterOptions = () => {
    var filterOptions = []
    if (selectedView === 'All Users') {
      filterOptions = [
        'Default',
        'Sort by Pending',
        'Sort by Approved',
        'Sort by Rejected',
        'Sort A to Z by Name',
        'Sort Z to A by Name',
        'Sort A to Z by Email',
        'Sort Z to A by Email',
      ]
    }
    else if (selectedView ==='Not Applied') {
      filterOptions = [
        'Default',
        'Sort A to Z by Email',
        'Sort Z to A by Email',
      ]
    }
    else if (selectedView === 'Pending') {
      filterOptions = [
        'Default',
        'Sort by Pending Approval',
        'Sort by Pending Rejection',
        'Sort A to Z by Name',
        'Sort Z to A by Name',
        'Sort A to Z by Email',
        'Sort Z to A by Email',
      ]
    }
    else if (selectedView === 'Approved' || selectedView === 'Rejected') {
      filterOptions = [
        'Default',
        'Sort A to Z by Name',
        'Sort Z to A by Name',
        'Sort A to Z by Email',
        'Sort Z to A by Email',
      ]
    }
    return filterOptions
  }

  const filterOptions = makeFilterOptions()

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

  const userFilter = (x, y) => {
    if (filter === 'Sort by Pending') {
      if (x.uid && y.uid) {
        if (x.qualified === '') {
          if (y.qualified === 'yeah') { return -1 }
          else if (y.qualified === 'nope') { return -1 }
          else if (y.qualified === '') { return 0 }
        }
        else if (x.qualified === 'yeah') {
          if (y.qualified === 'yeah') { return 0 }
          else if (y.qualified === 'nope') { return -1 }
          else if (y.qualified === '') { return 1 }
        }
        else if (x.qualified === 'nope') {
          if (y.qualified === 'yeah') { return 1 }
          else if (y.qualified === 'nope') { return 0 }
          else if (y.qualified === '') { return 1 }
        }
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
    }
    else if (filter === 'Sort by Approved') {
      if (x.uid && y.uid) {
        if (x.qualified === '') {
          if (y.qualified === 'yeah') { return 1 }
          else if (y.qualified === 'nope') { return 1 }
          else if (y.qualified === '') { return 0 }
        }
        else if (x.qualified === 'yeah') {
          if (y.qualified === 'yeah') { return 0 }
          else if (y.qualified === 'nope') { return -1 }
          else if (y.qualified === '') { return -1 }
        }
        else if (x.qualified === 'nope') {
          if (y.qualified === 'yeah') { return 1 }
          else if (y.qualified === 'nope') { return 0 }
          else if (y.qualified === '') { return -1 }
        }
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
    }
    else if (filter === 'Sort by Rejected') {
      if (x.uid && y.uid) {
        if (x.qualified === '') {
          if (y.qualified === 'yeah') { return 1 }
          else if (y.qualified === 'nope') { return 1 }
          else if (y.qualified === '') { return 0 }
        }
        else if (x.qualified === 'yeah') {
          if (y.qualified === 'yeah') { return 0 }
          else if (y.qualified === 'nope') { return 1 }
          else if (y.qualified === '') { return -1 }
        }
        else if (x.qualified === 'nope') {
          if (y.qualified === 'yeah') { return -1 }
          else if (y.qualified === 'nope') { return 0 }
          else if (y.qualified === '') { return -1 }
        }
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
    }
    else if (filter === 'Sort A to Z by Name') {
      if (x.uid && y.uid) {
        var xFullName = (x.name.first + " " + x.name.last).toLowerCase()
        var yFullName = (y.name.first + " " + y.name.last).toLowerCase()
        if (xFullName > yFullName) { return 1 }
        else if (xFullName < yFullName) { return -1 }
        else { return 0}
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
    }
    else if (filter === 'Sort Z to A by Name') {
      if (x.uid && y.uid) {
        var xFullName = (x.name.first + " " + x.name.last).toLowerCase()
        var yFullName = (y.name.first + " " + y.name.last).toLowerCase()
        if (xFullName > yFullName) { return -1 }
        else if (xFullName < yFullName) { return 1 }
        else { return 0}
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
    }
    else if (filter === 'Sort A to Z by Email') {
      var xEmail = x.email.toLowerCase()
      var yEmail = y.email.toLowerCase()
      if (xEmail > yEmail) { return 1 }
      else if (xEmail < yEmail) { return -1 }
      else { return 0}
    }
    else if (filter === 'Sort Z to A by Email') {
      var xEmail = x.email.toLowerCase()
      var yEmail = y.email.toLowerCase()
      if (xEmail > yEmail) { return -1 }
      else if (xEmail < yEmail) { return 1 }
      else { return 0}
    }
    else if (filter === 'Sort by Pending Approval') {
      if (x.uid && y.uid) {
        if (x.criteriaMet && x.criteriaMet != y.criteriaMet) { return -1 }
        else if (y.criteriaMet && x.criteriaMet != y.criteriaMet) { return 1 }
        else { return 0 }
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
    }
    else if (filter === 'Sort by Pending Rejection') {
      if (x.uid && y.uid) {
        if (x.criteriaMet && x.criteriaMet != y.criteriaMet) { return 1 }
        else if (y.criteriaMet && x.criteriaMet != y.criteriaMet) { return -1 }
        else { return 0 }
      }
      else if (x.uid) { return -1 }
      else { return 0 } // not applied
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
        var full_name = (user.name.first + user.name.last).toLowerCase().replace(/\s/g, '')
        if (!(full_name.includes(searchQuery.name.toLowerCase().replace(/\s/g, '')))) { nameMatch = false }
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
      setSearchQuery({})
      setValidSearch(false)
    }
  }

  var numSignedUp = Object.keys(data.users).length
  var numNotApplied = Object.keys(data.users.filter(user => !user.uid)).length
  var numPending = Object.keys(data.users.filter(user => user.qualified === '')).length
  var numApproved = Object.keys(data.users.filter(user => user.qualified === 'yeah')).length
  var numRejected = Object.keys(data.users.filter(user => user.qualified === 'nope')).length

  return (
    <>
      <OverviewStats
        numSignedUp={numSignedUp}
        numNotApplied={numNotApplied}
        numPending={numPending}
        numApproved={numApproved}
        numRejected={numRejected}
      />
      <div className='flex mt-8'>
        <div>
          <Filter 
            filters={filterOptions}
            setFilter={setFilter}
            currentFilter={filter}
            setSorted={setSorted}
          />
        </div>
        <div className='w-full mb-4'>
          <div className='w-full flex items-center pl-2 border-2 border-gray-400 rounded-md'>
            <BiSearch className='text-2xl text-gray-500'/>
            <input
              className='w-full ml-2 py-2 outline-0 rounded-tr-md rounded-br-md'
              value={searchFilter}
              onChange={handleSearchFilter}
            />
            { searchFilter.length > 0 &&
              <div
                className='p-2 rounded-full text-2xl text-gray-500 hover:bg-gray-100 cursor-pointer'
                onClick={() => { setSearchFilter(''); setSearchQuery('') }}
              >
                <BiX title='Clear Search' />
              </div>
            }
          </div>
          { sorted && 
            <p className='mb-0 text-sm'>Filter applied: {filter}. </p>
          }
          { searchFilter.length > 0 && !validSearch &&
            <p className='mb-0 text-sm'>Not a valid search.</p>
          }
        </div>
      </div>
      <Overviews
        viewOptions={viewOptions}
        selectedView={selectedView}
        selectView={selectView}
        setFilter={setFilter}
        setSorted={setSorted}
      />
      <UserActions
        allSelected={allSelected}
        toggleSelectAllUsers={toggleSelectAllUsers}
        expandedUsers={expandedUsers}
        toggleExpandAllUsers={toggleExpandAllUsers}
        selectedUsers={selectedUsers}
        selectedView={selectedView}
      />
      { /* all users */
        selectedView === 'All Users' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? data.users.map((user, idx) =>
            <UserBox
              key={'allUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
            :
            [...data.users].sort((x, y) => userFilter(x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
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
        selectedView === 'Not Applied' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? data.users.filter(user => !user.uid && userMatch(user)).map((user, idx) =>
            <UserBox
              key={'allUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
            :
            [...data.users.filter(user => !user.uid && userMatch(user))].sort((x, y) => userFilter(x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
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
        selectedView === 'Pending' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? data.users.filter(user => user.qualified === '' && userMatch(user)).map((user, idx) =>
            <UserBox
              key={'allUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(true)}
            />)
            :
            [...data.users.filter(user => user.qualified === '' && userMatch(user))].sort((x, y) => userFilter(x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(true)}
            />)
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
        selectedView === 'Approved' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? data.users.filter(user => user.qualified === 'yeah' && userMatch(user)).map((user, idx) =>
            <UserBox
              key={'allUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
            :
            [...data.users.filter(user => user.qualified === 'yeah' && userMatch(user))].sort((x, y) => userFilter(x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
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
        selectedView === 'Rejected' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? data.users.filter(user => user.qualified === 'nope' && userMatch(user)).map((user, idx) =>
            <UserBox
              key={'allUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
            :
            [...data.users.filter(user => user.qualified === 'nope' && userMatch(user))].sort((x, y) => userFilter(x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(false)}
            />)
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
    </>
  )
}
