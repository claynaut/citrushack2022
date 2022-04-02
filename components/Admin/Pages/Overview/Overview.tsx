import React, { useState } from 'react'
import {
  OverviewStats,
  Overviews,
  UserActions,
  UserFilter
} from '@/components/Admin'
import { QueriedUsers } from './QueriedUsers'
import { SearchBar } from '@/components/Admin'

export function Overview({ data }) {
  const [selectedView, setSelectedView] = useState('Checked-In')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [expandedUsers, setExpandedUsers] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)
  const [filter, setFilter] = useState('Default')
  const [sorted, setSorted] = useState(false)

  const viewOptions = [
    'Checked-In',
    'Not Checked-In',
    'Approved',
    'All Users',
    'Rejected',
    'Not Applied',
    'Pending',
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
      else if (selectedView === 'Checked-In') {
        setSelectedUsers(data.users.filter(user => user.qualified === 'yeah' && user.checkedIn))
      }
      else if (selectedView === 'Not Checked-In') {
        setSelectedUsers(data.users.filter(user => user.qualified === 'yeah' && !user.checkedIn))
      }
    }
    else {
      setSelectedUsers([])
    }
  }

  const toggleExpandAllUsers = (expandAll: boolean) => {
    if (expandAll) { setExpandedUsers(data.users) }
    else { setExpandedUsers([]) }
  }

  return (
    <>
      <OverviewStats users={data.users} />
      <div className='flex mt-8'>
        <UserFilter 
          selectedView={selectedView}
          setFilter={setFilter}
          currentFilter={filter}
          setSorted={setSorted}
        />
        <SearchBar
          searchAttributes='uid|name|email'
          subtext='Search for a user by UID, name, or email.'
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          setSearchQuery={setSearchQuery}
          validSearch={validSearch}
          setValidSearch={setValidSearch}
        />
      </div>
      { sorted && 
        <p className='mt-0 ml-12 text-sm'>
          <span className='font-medium'>Filter applied:</span> {filter}. 
        </p>
      }
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
      <QueriedUsers
        selectedView={selectedView}
        view='All Users'
        showPending={Boolean(false)}
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
      <QueriedUsers
        selectedView={selectedView}
        view='Pending'
        showPending={Boolean(true)}
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
      <QueriedUsers
        selectedView={selectedView}
        view='Not Applied'
        showPending={Boolean(false)}
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
      <QueriedUsers
        selectedView={selectedView}
        view='Approved'
        showPending={Boolean(false)}
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
      <QueriedUsers
        selectedView={selectedView}
        view='Rejected'
        showPending={Boolean(false)}
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
      <QueriedUsers
        selectedView={selectedView}
        view='Checked-In'
        showPending={Boolean(false)}
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
      <QueriedUsers
        selectedView={selectedView}
        view='Not Checked-In'
        showPending={Boolean(false)}
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
