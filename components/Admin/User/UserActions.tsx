import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
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
  BiBot
} from 'react-icons/bi'
import Modal from '@/components/Modal'

export function UserActions({
  allSelected,
  toggleSelectAllUsers,
  expandedUsers,
  toggleExpandAllUsers,
  selectedUsers,
  selectedView
}) {
  const router = useRouter()
  const [confirmReminder, setConfirmReminder] = useState(false)
  const [confirmAuto, setConfirmAuto] = useState(false)
  const [confirmApprove, setConfirmApprove] = useState(false)
  const [confirmReject, setConfirmReject] = useState(false)
  
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

  const autoDecideSelected = (users) => {
    axios.post('/api/applications/auto-review', { users })
    .then(() => {
      toast.success(
        'Auto-decided selected successfully!',
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
        (selectedView === 'Not Applied' || selectedView === 'Pending') &&
        <p className='mt-3 font-normal text-base'>
          <span className='font-medium'>Tip:</span> Select a row to perform more actions.
        </p>
      }
      <div
        className={
          'flex gap-2 items-center text-2xl '
          + (!(selectedView === 'Not Applied' || selectedView === 'Pending') ? 'mt-3' : '')
        }
      >
        <div
          className='p-2 rounded-full hover:bg-sub cursor-pointer'
          onClick={() => toggleSelectAllUsers(!allSelected)}
        >
          {
            allSelected ? <BiCheckboxSquare title='Deselect All' /> : <BiCheckbox title='Select All' />
          }
        </div>
        <div
          className='p-2 rounded-full hover:bg-sub cursor-pointer'
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
                className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-amber-500 hover:bg-amber-100 cursor-pointer'
                onClick={() => setConfirmReminder(true)}
              >
                <BiBell title='Remind Selected to Apply' />
                <span className='text-base'>Remind</span>
              </div>
            }
            { selectedView === 'Pending' &&
              <>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-blue-500 hover:bg-blue-100 cursor-pointer'
                  onClick={() => setConfirmAuto(true)}
                >
                  <BiBot title='Auto-Decide Selected' />
                  <span className='text-base'>Auto-Decide</span>
                </div>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-green-600 hover:bg-green-100 cursor-pointer'
                  onClick={() => setConfirmApprove(true)}
                >
                  <BiTask title='Approve Selected' />
                  <span className='text-base'>Approve</span>
                </div>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-red-500 hover:bg-red-100 cursor-pointer'
                  onClick={() => setConfirmReject(true)}
                >
                  <BiTaskX title='Reject Selected' />
                  <span className='text-base'>Reject</span>
                </div>
              </>
            }
          </div>
        }
      </div>
      <Modal
        show={confirmReminder}
        handler={setConfirmReminder}
        title='Confirm Action'
        description='Are you sure you want to remind all of the selected users to apply?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-amber-500 text-white cursor-pointer'
            onClick={() => { remindToApply(selectedUsers); setConfirmReminder(false) }}
          >
            Remind Selected to Apply
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmAuto}
        handler={setConfirmAuto}
        title='Confirm Action'
        description='Are you sure you want to auto-decide all of the selected users?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-blue-500 text-white cursor-pointer'
            onClick={() => { autoDecideSelected(selectedUsers); setConfirmAuto(false) }}
          >
            Auto-Decide Selected
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmApprove}
        handler={setConfirmApprove}
        title='Confirm Action'
        description='Are you sure you want to approve all selected users?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-green-500 text-white cursor-pointer'
            onClick={() => { approveSelected(selectedUsers, true); setConfirmApprove(false) }}
          >
            Approve Selected
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmReject}
        handler={setConfirmReject}
        title='Confirm Action'
        description='Are you sure you want to reject all selected users?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-red-500 text-white cursor-pointer'
            onClick={() => { rejectSelected(selectedUsers, false); setConfirmReject(false) }}
          >
            Reject Selected
          </motion.button>
        </div>
      </Modal>
    </>
  )
}