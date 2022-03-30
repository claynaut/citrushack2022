import React, { useState } from 'react'
import { BiSearch, BiX } from 'react-icons/bi'
import {
  UserBox,
  OverviewStats,
  Overviews,
  UserActions,
  UserFilter
} from '@/components/Admin'
import { AllUsers } from './AllUsers'
import { NotAppliedUsers } from './NotAppliedUsers'
import { ApprovedUsers } from './ApprovedUsers'
import { RejectedUsers } from './RejectedUsers'
import { PendingUsers } from './PendingUsers'

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

  // regex for searching users by uid, email, or name
  const regex = /(uid|email|name):\s*[a-zA-Z0-9._]+/

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
          <UserFilter 
            filters={filterOptions}
            setFilter={setFilter}
            currentFilter={filter}
            setSorted={setSorted}
          />
        </div>
        <div className='w-full mb-4'>
          <div className='w-full flex items-center pl-2 border-2 border-sub-highlight rounded-md bg-card'>
            <BiSearch className='text-2xl'/>
            <input
              className='w-full ml-2 py-2 outline-0 rounded-tr-md rounded-br-md bg-card'
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
          { searchFilter.length === 0 &&
            <p className='mb-0 text-sm'>Search for a user by UID, name, or email. Note that UID is case-sensitive while name and email are not.</p>
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
      <AllUsers
        selectedView={selectedView}
        validSearch={validSearch}
        sorted={sorted}
        users={data.users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        expandedUsers={expandedUsers}
        setExpandedUsers={setExpandedUsers}
        filter={filter}
        searchQuery={searchQuery}
      />
      <NotAppliedUsers
        selectedView={selectedView}
        validSearch={validSearch}
        sorted={sorted}
        users={data.users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        expandedUsers={expandedUsers}
        setExpandedUsers={setExpandedUsers}
        filter={filter}
        searchQuery={searchQuery}
      />
      <PendingUsers
        selectedView={selectedView}
        validSearch={validSearch}
        sorted={sorted}
        users={data.users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        expandedUsers={expandedUsers}
        setExpandedUsers={setExpandedUsers}
        filter={filter}
        searchQuery={searchQuery}
      />
      <ApprovedUsers
        selectedView={selectedView}
        validSearch={validSearch}
        sorted={sorted}
        users={data.users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        expandedUsers={expandedUsers}
        setExpandedUsers={setExpandedUsers}
        filter={filter}
        searchQuery={searchQuery}
      />
      <RejectedUsers
        selectedView={selectedView}
        validSearch={validSearch}
        sorted={sorted}
        users={data.users}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        expandedUsers={expandedUsers}
        setExpandedUsers={setExpandedUsers}
        filter={filter}
        searchQuery={searchQuery}
      />
    </>
  )
}
