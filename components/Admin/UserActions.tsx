import axios from 'axios'
import { useRouter } from 'next/router'
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
import { Legend } from './Legend'

export function UserActions({
  allSelected,
  toggleSelectAllUsers,
  expandedUsers,
  toggleExpandAllUsers,
  selectedUsers,
  selectedView
}) {
  const router = useRouter()
  
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
      router.reload()
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
      router.reload()
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
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'rejectedSelectedError' }
      )
    })
  }

  return (
    <>
      {
        selectedUsers.length === 0 && (selectedView === 'Not Applied' || selectedView === 'Pending') &&
        <p className='m-0 mt-3 mb-2 font-normal text-base'>
          <span className='font-medium'>Tip:</span> Select a row to perform more actions.
        </p>
      }
      {
        selectedUsers.length > 0 &&
        <Legend selectedView={selectedView} />
      }
      <div
        className={
          'flex gap-2 items-center text-2xl '
          + (!(selectedView === 'Not Applied' || selectedView === 'Pending') ? 'mt-3' : '')
        }
      >
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
          selectedUsers.length > 0 && (selectedView == 'Not Applied' || selectedView == 'Pending') &&
          <div className='flex gap-1 items-center pl-2 border-l-2'>
            { selectedView === 'Not Applied' &&
              <div
                className='p-2 rounded-full hover:text-amber-500 hover:bg-amber-100 cursor-pointer'
                onClick={() => remindToApply(selectedUsers)}
              >
                <BiBell title='Remind Selected to Apply' />
              </div>
            }
            { selectedView === 'Pending' &&
              <>
                <div
                  className='p-2 rounded-full hover:text-blue-500 hover:bg-blue-100 cursor-pointer'
                  onClick={() => autoReviewSelected(selectedUsers)}
                >
                  <BiHighlight title='Auto-Review Selected' />
                </div>
                <div
                  className='p-2 rounded-full hover:text-green-600 hover:bg-green-100 cursor-pointer'
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
    </>
  )
}