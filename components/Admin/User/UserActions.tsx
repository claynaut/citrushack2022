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
  BiMailSend,
  BiTask,
  BiTaskX,
  BiBot,
  BiMobileVibration
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
  const [confirmApplyReminder, setConfirmApplyReminder] = useState(false)
  const [confirmInPersonReminder, setConfirmInPersonReminder] = useState(false)
  const [confirmDiscordReminder, setConfirmDiscordReminder] = useState(false)
  const [confirmCheckInReminder, setConfirmCheckInReminder] = useState(false)
  const [confirmAuto, setConfirmAuto] = useState(false)
  const [confirmApprove, setConfirmApprove] = useState(false)
  const [confirmReject, setConfirmReject] = useState(false)
  const [confirmRedoApprove, setConfirmRedoApprove] = useState(false)
  
  const remindToApply = (users) => {
    axios.post('/api/applications/remind-apply', { users })
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

  const remindAboutInPerson = (users) => {
    axios.post('/api/applications/remind-inperson', { users })
    .then(() => {
      toast.success(
        'Successfully sent reminders!',
        { id: 'inPersonReminderSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'inPersonReminderError' }
      )
    })
  }

  const remindToJoinDiscord = (users) => {
    axios.post('/api/applications/remind-discord', { users })
    .then(() => {
      toast.success(
        'Successfully sent reminders!',
        { id: 'discordReminderSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'discordReminderError' }
      )
    })
  }

  const remindToCheckIn = (users) => {
    axios.post('/api/applications/remind-checkin', { users })
    .then(() => {
      toast.success(
        'Successfully sent reminders!',
        { id: 'checkinReminderSuccess' }
      )
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'checkinReminderError' }
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

  const redoApproveSelected = (users) => {
    axios.post('/api/applications/re-review', { users })
    .then(() => {
      toast.success(
        'Approved selected successfully!',
        { id: 'redoApprovedSelectedSuccess' }
      )
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong...',
        { id: 'redoApprovedSelectedError' }
      )
    })
  }

  return (
    <>
      {
        (
          selectedView === 'Not Applied' || 
          selectedView === 'Pending' || 
          selectedView == 'Approved' || 
          selectedView === 'Rejected' || 
          selectedView === 'Not Checked-In'
        ) &&
        <p className='mt-3 font-normal text-sm'>
          <span className='font-medium'>Tip:</span> Select a row to perform more actions.
        </p>
      }
      <div
        className={
          'flex flex-col xs:flex-row gap-2 xs:items-center text-2xl '
          + (
              !(selectedView === 'Not Applied' || 
                selectedView === 'Pending' || 
                selectedView == 'Approved' || 
                selectedView === 'Rejected' || 
                selectedView === 'Not Checked-In'
              ) 
              ? 'mt-3' : ''
            )
        }
      >
        <div className='flex'>
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
        </div>
        {
          selectedUsers.length > 0 && (
            selectedView == 'Not Applied' ||
            selectedView == 'Pending' ||
            selectedView == 'Approved' || 
            selectedView == 'Rejected' || 
            selectedView == 'Not Checked-In'
          ) &&
          <div className='flex flex-col sm:flex-row gap-1 sm:items-center ml-[1.125rem] sm:ml-0 pl-2 border-l-2 border-sub'>
            { selectedView === 'Not Applied' &&
              <div
                className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-amber-600 hover:bg-amber-200 cursor-pointer'
                onClick={() => setConfirmApplyReminder(true)}
              >
                <div><BiMailSend title='Remind Selected to Apply' /></div>
                <span className='text-sm sm:text-base'>Remind to Apply</span>
              </div>
            }
            { selectedView === 'Pending' &&
              <>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-blue-600 hover:bg-blue-200 cursor-pointer'
                  onClick={() => setConfirmAuto(true)}
                >
                 <div><BiBot title='Auto-Decide Selected' /></div>
                  <span className='text-sm sm:text-base'>Auto-Decide</span>
                </div>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-green-600 hover:bg-green-200 cursor-pointer'
                  onClick={() => setConfirmApprove(true)}
                >
                  <div><BiTask title='Approve Selected' /></div>
                  <span className='text-sm sm:text-base'>Approve</span>
                </div>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-red-600 hover:bg-red-200 cursor-pointer'
                  onClick={() => setConfirmReject(true)}
                >
                  <div><BiTaskX title='Reject Selected' /></div>
                  <span className='text-base'>Reject</span>
                </div>
              </>
            }
            { selectedView === 'Not Checked-In' &&
              <div
                className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-amber-600 hover:bg-amber-200 cursor-pointer'
                onClick={() => setConfirmCheckInReminder(true)}
              >
                <div><BiMailSend title='Remind Selected to Check-In' /></div>
                <span className='text-base'>Remind to Check-In</span>
              </div>
            }
            { selectedView === 'Approved' &&
              <>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-amber-600 hover:bg-amber-200 cursor-pointer'
                  onClick={() => setConfirmInPersonReminder(true)}
                >
                  <div><BiMailSend title='Remind Selected About In-Person' /></div>
                  <span className='text-base'>Remind About In-Person</span>
                </div>
                <div
                  className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-indigo-600 hover:bg-indigo-200 cursor-pointer'
                  onClick={() => setConfirmDiscordReminder(true)}
                >
                  <div><BiMobileVibration title='Remind Selected to Join Discord' /></div>
                  <span className='text-base'>Remind to Join Discord</span>
                </div>
              </>
            }
            { selectedView === 'Rejected' &&
              <div
                className='flex items-center gap-2 p-2 pl-2.5 pr-3 rounded-full hover:text-green-600 hover:bg-green-200 cursor-pointer'
                onClick={() => setConfirmRedoApprove(true)}
              >
                <div><BiTask title='Approve Selected' /></div>
                <span className='text-base'>Approve</span>
              </div>
            }
          </div>
        }
      </div>
      <Modal
        show={confirmApplyReminder}
        handler={setConfirmApplyReminder}
        title='Confirm Action'
        description='Are you sure you want to remind all of the selected users to apply?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-amber-400 text-white cursor-pointer'
            onClick={() => { remindToApply(selectedUsers); setConfirmApplyReminder(false) }}
          >
            Remind Selected to Apply
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmInPersonReminder}
        handler={setConfirmInPersonReminder}
        title='Confirm Action'
        description='Are you sure you want to remind all of the selected users about in-person?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-amber-400 text-white cursor-pointer'
            onClick={() => { remindAboutInPerson(selectedUsers); setConfirmInPersonReminder(false) }}
          >
            Remind Selected About In-Person
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmDiscordReminder}
        handler={setConfirmDiscordReminder}
        title='Confirm Action'
        description='Are you sure you want to remind all of the selected users about joining the Discord server?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-indigo-400 text-white cursor-pointer'
            onClick={() => { remindToJoinDiscord(selectedUsers); setConfirmDiscordReminder(false) }}
          >
            Remind Selected About Joining Discord
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmCheckInReminder}
        handler={setConfirmCheckInReminder}
        title='Confirm Action'
        description='Are you sure you want to remind all of the selected users to check-in?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-amber-400 text-white cursor-pointer'
            onClick={() => { remindToCheckIn(selectedUsers); setConfirmCheckInReminder(false) }}
          >
            Remind Selected to Check-In          
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
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-blue-400 text-white cursor-pointer'
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
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-green-400 text-white cursor-pointer'
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
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-red-400 text-white cursor-pointer'
            onClick={() => { rejectSelected(selectedUsers, false); setConfirmReject(false) }}
          >
            Reject Selected
          </motion.button>
        </div>
      </Modal>
      <Modal
        show={confirmRedoApprove}
        handler={setConfirmRedoApprove}
        title='Confirm Action'
        description='Are you sure you want to approve all originally rejected selected users?'
      >
        <div className='flex justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.995 }}
            className='flex items-center self-center h-11 px-4 font-semibold text-lg rounded-md bg-green-400 text-white cursor-pointer'
            onClick={() => { redoApproveSelected(selectedUsers); setConfirmRedoApprove(false) }}
          >
            Approve Selected
          </motion.button>
        </div>
      </Modal>
    </>
  )
}