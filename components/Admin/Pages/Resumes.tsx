import React, { useState } from 'react'
import { BiSearch, BiX } from 'react-icons/bi'
import { FileBox, FileActions } from '@/components/Admin'

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

  // regex for searching users by uid, email, or name
  const regex = /(uid|name):\s*[a-zA-Z0-9._]+/

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
            <p className='mb-0 text-sm'>Search for a user's resume by a user's UID or name. Note that UID is case-sensitive while name is not.</p>
          }
        </div>
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