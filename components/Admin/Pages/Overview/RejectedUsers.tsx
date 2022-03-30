import { userFilter, userMatch } from './components'
import { UserBox } from '@/components/Admin/User'

export function RejectedUsers({
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
      { /* rejected applicants */
        selectedView === 'Rejected' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? users.filter(user => user.qualified === 'nope' && userMatch(searchQuery, user)).map((user, idx) =>
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
            [...users.filter(user => user.qualified === 'nope' && userMatch(searchQuery, user))].sort((x, y) => userFilter(filter, x, y)).map((user, idx) =>
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
          { validSearch && users.filter(user => user.qualified === 'nope' && userMatch(searchQuery, user)).map((user, idx) =>
            <UserBox
              key={'searchedRejectedUsers'+String(idx)}
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