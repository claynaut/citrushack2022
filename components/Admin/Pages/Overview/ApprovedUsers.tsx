import { userFilter, userMatch } from './components'
import { UserBox } from '@/components/Admin/User'

export function ApprovedUsers({
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
      { /* approved hackers */
        selectedView === 'Approved' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? users.filter(user => user.qualified === 'yeah' && userMatch(searchQuery, user)).map((user, idx) =>
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
            [...users.filter(user => user.qualified === 'yeah' && userMatch(searchQuery, user))].sort((x, y) => userFilter(filter, x, y)).map((user, idx) =>
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
          { validSearch && users.filter(user => user.qualified === 'yeah' && userMatch(searchQuery, user)).map((user, idx) =>
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
    </>
  )
}