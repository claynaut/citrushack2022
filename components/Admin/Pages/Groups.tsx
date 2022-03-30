import React, { useState } from 'react'
import { GroupBox, GroupActions, SearchBar } from '@/components/Admin'

export function Groups({ data }) {
  const [expandedGroups, setExpandedGroups] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)

  const toggleExpandAllGroups = (expandAll: boolean) => {
    if (expandAll) { setExpandedGroups(data.groups) }
    else { setExpandedGroups([]) }
  }

  // check if a search matches
  const groupMatch = (group) => {
    var gidMatch = true
    var uidMatch = true
    var nameMatch = true
    var emailMatch = true
    var match = true
    
    if (searchQuery.gid) {
      if (!group.gid.includes(searchQuery.gid)) { gidMatch = false }
    }

    var anyUIDMatch = false
    var anyNameMatch = false
    var anyEmailMatch = false
    for (let i = 0; i < group.users.length; i++) {
      const user = group.users[i]
      if (searchQuery.uid) {
        if (user.id.includes(searchQuery.uid)) { anyUIDMatch = true }
      }
      if (searchQuery.name) {
        var full_name = (user.name.first + user.name.last).toLowerCase().replace(/\s/g, '')
        if (full_name.includes(searchQuery.name.toLowerCase().replace(/\s/g, ''))) { anyNameMatch = true }
      }
      if (searchQuery.email) {
        if (user.email && user.email.toLowerCase().includes(searchQuery.email.toLowerCase())) { anyEmailMatch = true }
      }
    }

    if (searchQuery.uid) { uidMatch = anyUIDMatch }
    if (searchQuery.name) { nameMatch = anyNameMatch }
    if (searchQuery.email) { emailMatch = anyEmailMatch }

    if (!gidMatch || !uidMatch || !nameMatch || !emailMatch) { match = false }
    return match
  }
  
  return (
    <>
      <div className='flex'>
        <SearchBar
          searchAttributes='uid|gid|name|email'
          subtext='Search for a resume by GID, UID, name, or email.'
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          setSearchQuery={setSearchQuery}
          validSearch={validSearch}
          setValidSearch={setValidSearch}
        />
      </div>
      <GroupActions
        expandedGroups={expandedGroups}
        toggleExpandAllGroups={toggleExpandAllGroups}
      />
      <div className='flex flex-col gap-2 mt-3'>
        { !validSearch ? data.groups.map((group) => 
            <GroupBox
              key={group.gid}
              group={group}
              expandedGroups={expandedGroups}
              setExpandedGroups={setExpandedGroups}
            />
          )
          :
          ( data.groups.filter(group => groupMatch(group)).map((group) => 
            <GroupBox
              key={group.gid}
              group={group}
              expandedGroups={expandedGroups}
              setExpandedGroups={setExpandedGroups}
            />
          )
        )}
      </div>
    </>
  )
}