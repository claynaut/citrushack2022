import React, { useState } from 'react'
import { BiSearch, BiX } from 'react-icons/bi'
import { GroupBox, GroupActions } from '@/components/Admin'

export function Groups({ data }) {
  const [selectedView, setSelectedView] = useState('List')
  const [expandedGroups, setExpandedGroups] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)
  const [filter, setFilter] = useState('Default')
  const [sorted, setSorted] = useState(false)

  const toggleExpandAllGroups = (expandAll: boolean) => {
    if (expandAll) {
      setExpandedGroups([])
    }
    else {
      setExpandedGroups([])
    }
  }

  const toggleView = () => {
    setSelectedView(selectedView === 'List' ? 'Grid' : 'List')
  }

  // regex for searching users by uid, email, or name
  const regex = /(uid|name):\s*[a-zA-Z0-9._]+/

  // check if a search matches
  const groupMatch = (doc) => {
    var uidMatch = true
    var nameMatch = true
    var match = true
    var [first_name, last_name, uid] = doc.name.split('###')
    if (searchQuery.uid) {
      if (!uid.includes(searchQuery.uid)) { uidMatch = false }
    }
    if (searchQuery.name) {
      var full_name = (first_name + last_name).toLowerCase().replace(/\s/g, '')
      if (!(full_name.includes(searchQuery.name.toLowerCase().replace(/\s/g, '')))) { nameMatch = false }
    }
    if (!uidMatch || !nameMatch) { match = false }
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
      <GroupActions
        expandedGroups={expandedGroups}
        toggleExpandAllGroups={toggleExpandAllGroups}
        toggleView={toggleView}
        selectedView={selectedView}
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