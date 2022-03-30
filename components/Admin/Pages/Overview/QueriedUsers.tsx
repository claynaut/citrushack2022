import { userFilter, userMatch, userViewDisplay } from './components'
import { UserBox } from '@/components/Admin/User'

export function QueriedUsers({
  selectedView,
  view,
  showPending,
  validSearch,
  sorted,
  users,
  selectedUsers,
  setSelectedUsers,
  expandedUsers,
  setExpandedUsers,
  filter,
  searchQuery,
}) {
  return (
    <>
      {
        selectedView === view &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? users.filter(user => userViewDisplay(selectedView, user) && userMatch(searchQuery, user)).map((user, idx) =>
            <UserBox
              key={'allUsers-'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={showPending}
            />)
            :
            [...users.filter(user => userViewDisplay(selectedView, user) && userMatch(searchQuery, user))].sort((x, y) => userFilter(filter, x, y)).map((user, idx) =>
            <UserBox
              key={'filterAllUsers-'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={showPending}
            />)
          )}
          { validSearch && users.filter(user => userViewDisplay(selectedView, user) && userMatch(searchQuery, user)).map((user, idx) =>
            <UserBox
              key={'searchedPendingUsers-'+String(idx)}
              user={user}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              expandedUsers={expandedUsers}
              setExpandedUsers={setExpandedUsers}
              pending={showPending}
            />
          )}
        </div>
      }
    </>
  )
}