import { userFilter, userMatch } from './components'
import { UserBox } from '@/components/Admin/User'

export function NotAppliedUsers({
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
      { /* users who haven't applied yet */
        selectedView === 'Not Applied' &&
        <div className='flex flex-col gap-2 mt-3'>
          { !validSearch && (!sorted ? users.filter(user => !user.uid && userMatch(searchQuery, user)).map((user, idx) =>
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
            [...users.filter(user => !user.uid && userMatch(searchQuery, user))].sort((x, y) => userFilter(filter, x, y)).map((user, idx) =>
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
          { validSearch && users.filter(user => !user.uid && userMatch(searchQuery, user)).map((user, idx) =>
            <UserBox
              key={'searchedNotAppliedUsers'+String(idx)}
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