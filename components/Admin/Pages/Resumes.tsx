import React, { useState } from 'react'
import { FileBox, FileActions } from '@/components/Admin'
import { SearchBar } from '@/components/Admin/SearchBar'

export function Resumes() {
  const [docs, setDocs] = useState(localStorage.getItem('docs') ? JSON.parse(localStorage.getItem('docs')) : [])
  const [selectedDocs, setSelectedDocs] = useState([])
  const [allSelected, setAllSelected] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState(Object)
  const [validSearch, setValidSearch] = useState(false)

  const toggleSelectAllDocs = (selectAll: boolean) => {
    setAllSelected(selectAll)
    if (selectAll) { setSelectedDocs(docs) }
    else { setSelectedDocs([]) }
  }

  // check if a search matches
  const docMatch = (doc) => {
    var uidMatch = true
    var nameMatch = true
    var match = true
    var [first_name, last_name, uid] = doc.name.split('___')
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

  return (
    <>
      <div className='flex'>
        <SearchBar
          searchAttributes='uid|name|email'
          subtext='Search for a resume by UID, name, or email.'
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          setSearchQuery={setSearchQuery}
          validSearch={validSearch}
          setValidSearch={setValidSearch}
        />
      </div>
      <FileActions
        allSelected={allSelected}
        toggleSelectAllDocs={toggleSelectAllDocs}
        selectedDocs={selectedDocs}
        setDocs={setDocs}
      />
      <div className='flex flex-col gap-2 mt-3'>
        { !validSearch ? docs.map((doc) => 
            <FileBox
              key={doc.name}
              doc={doc}
              selectedDocs={selectedDocs}
              setSelectedDocs={setSelectedDocs}
            />
          )
          :
          ( docs.filter(doc => docMatch(doc)).map((doc) => 
            <FileBox
              key={doc.name}
              doc={doc}
              selectedDocs={selectedDocs}
              setSelectedDocs={setSelectedDocs}
            />
          )
        )}
      </div>
    </>
  )
}