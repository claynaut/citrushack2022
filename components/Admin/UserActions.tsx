import axios from 'axios'
import { toast } from 'react-hot-toast'
import {
  BiCheckbox,
  BiCheckboxSquare,
  BiExpand,
  BiCollapse,
  BiBell,
  BiTask,
  BiTaskX,
  BiHighlight
} from 'react-icons/bi'

export function UserActions({
  allSelected,
  toggleSelectAllUsers,
  expandedUsers,
  toggleExpandAllUsers,
  selectedUsers,
  selectedView,
  viewOptions
}) {
  const remindToApply = (users) => {
    axios.post('/api/applications/remind', { users })
    .then(() => {
      toast.success(
        'Successfully sent reminders!',
        { id: 'appReminderSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'appReminderError' }
      )
    })
  }

  const autoReviewSelected = (users) => {
    axios.post('/api/applications/auto-review', { users })
    .then(() => {
      toast.success(
        'Auto-reviewed selected successfully!',
        { id: 'autoReviewSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'autoReviewError' }
      )
    })
  }

  const approveSelected = (users, approved) => {
    axios.post('/api/applications/manual-review', { users, approved })
    .then(() => {
      toast.success(
        'Approved selected successfully!',
        { id: 'approvedSelectedSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'approvedSelectedError' }
      )
    })
  }

  const rejectSelected = (users, approved) => {
    axios.post('/api/applications/manual-review', { users, approved })
    .then(() => {
      toast.success(
        'Rejected selected successfully!',
        { id: 'rejectedSelectedSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'rejectedSelectedError' }
      )
    })
  }

  return (
    <div className='flex gap-2 items-center mt-3 text-2xl'>
      <div
        className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
        onClick={() => toggleSelectAllUsers(!allSelected)}
      >
        {
          allSelected ? <BiCheckboxSquare title='Select All' /> : <BiCheckbox title='Select All' />
        }
      </div>
      <div
        className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
        onClick={() => toggleExpandAllUsers(!(expandedUsers.length > 0))}
      >
        {
          expandedUsers.length > 0 ?
          <BiCollapse title='Collapse All' />
          :
          <BiExpand title='Expand All' />
        }
      </div>
      {
        selectedUsers.length > 0 && (selectedView == viewOptions[1] || selectedView == viewOptions[2]) &&
        <div className='flex gap-1 items-center pl-2 border-l-2'>
          { selectedView === viewOptions[1] &&
            <div
              className='p-2 rounded-full hover:bg-gray-100 cursor-pointer'
              onClick={() => remindToApply(selectedUsers)}
            >
              <BiBell title='Remind Selected to Apply' />
            </div>
          }
          { selectedView === viewOptions[2] &&
            <>
              <div
                className='p-2 rounded-full hover:text-blue-500 hover:bg-blue-100 cursor-pointer'
                onClick={() => autoReviewSelected(selectedUsers)}
              >
                <BiHighlight title='Auto-Review Selected' />
              </div>
              <div
                className='p-2 rounded-full hover:text-green-500 hover:bg-green-100 cursor-pointer'
                onClick={() => approveSelected(selectedUsers, true)}
              >
                <BiTask title='Approve Selected' />
              </div>
              <div
                className='p-2 rounded-full hover:text-red-500 hover:bg-red-100 cursor-pointer'
                onClick={() => rejectSelected(selectedUsers, false)}
              >
                <BiTaskX title='Reject Selected' />
              </div>
            </>
          }
        </div>
      }
    </div>
  )
}