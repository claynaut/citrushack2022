import { userFilter, userMatch } from './components'
import { UserBox } from '@/components/Admin/User'

export function AllUsers({
  selectedView,
  validSearch,
  sorted,
  users,
  selectedUsers,
  setSelectedUsers,
  expandedUsers,
  setExpandedUsers,
  filter,
  searchQuery
}) {
  return (
    <>
      { /* all users */
        selectedView === 'All Users' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? users.map((user, idx) =>
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
            [...users].sort((x, y) => userFilter(filter, x, y)).map((user, idx) =>
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
          { validSearch && users.filter(user => userMatch(searchQuery, user)).map((user, idx) =>
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
    </>
  )
}