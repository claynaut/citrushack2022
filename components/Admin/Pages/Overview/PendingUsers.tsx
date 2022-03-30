import { userFilter, userMatch } from './components'
import { UserBox } from '@/components/Admin/User'

export function PendingUsers({
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
      { /* pending applications */
        selectedView === 'Pending' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? users.filter(user => user.qualified === '' && userMatch(searchQuery, user)).map((user, idx) =>
            <UserBox
              key={'allUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(true)}
            />)
            :
            [...users.filter(user => user.qualified === '' && userMatch(searchQuery, user))].sort((x, y) => userFilter(filter, x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(true)}
            />)
          )}
          { validSearch && users.filter(user => user.qualified === '' && userMatch(searchQuery, user)).map((user, idx) =>
            <UserBox
              key={'searchedPendingUsers'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={Boolean(true)}
            />
          )}
        </div>
      }
    </>
  )
}