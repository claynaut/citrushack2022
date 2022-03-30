import { BiSearch, BiX } from 'react-icons/bi'

export function SearchBar({
  searchAttributes,
  subtext,
  searchFilter,
  setSearchFilter,
  setSearchQuery,
  validSearch,
  setValidSearch
}) {
  const regex = new RegExp('(' + searchAttributes + '):\\s*[a-zA-Z0-9._]+')

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
    <div className='w-full mb-3'>
      <div className='w-full flex items-center pl-2 border-2 border-sub-highlight rounded-md bg-card'>
        <div>
          <BiSearch className='text-2xl'/>
        </div>
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
        <p className='mb-0 text-sm'>{subtext} Note that any type of ID is case-sensitive.</p>
      }
    </div>
  )
}