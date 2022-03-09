import React, { useState } from 'react'
import { BiSearch, BiX } from 'react-icons/bi'
import { GroupBox, GroupActions } from '@/components/Admin'

export function Groups({ data }) {
  const [expandedGroups, setExpandedGroups] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)

  const toggleExpandAllGroups = (expandAll: boolean) => {
    if (expandAll) { setExpandedGroups(data.groups) }
    else { setExpandedGroups([]) }
  }

  // regex for searching users by uid, email, or name
  const regex = /(gid|uid|name|email):\s*[a-zA-Z0-9._]+/

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
  
  return (
    <>
      <div className='flex'>
        <div className='w-full mb-3'>
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
          { searchFilter.length > 0 && !validSearch &&
            <p className='mb-0 text-sm'>Not a valid search.</p>
          }
          { searchFilter.length === 0 &&
            <p className='mb-0 text-sm'>Search for a group by a user's GID, UID, name, or email. Note that GID and UID is case-sensitive while name is not.</p>
          }
        </div>
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