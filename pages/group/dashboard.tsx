import React, { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useForm, useFormState } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import ProtectedPage from '@/components/ProtectedPage'
import { Input } from '@/components/Form'
import Modal from '@/components/Modal'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function GroupDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const { register, handleSubmit, control } = useForm()
  const { errors } = useFormState({ control })
  const { data, error } = useSWR('/api/groups/query', fetcher)
  const [modalOpen, setModalOpen] = useState(false)

  const joinGroup = ({ invite_code }) => {
    axios.post('/api/groups/join', { invite_code })
    .then(() => {
      toast.success('Successfully joined a group!', { id: 'joinGroupSuccess' })
      router.reload()
    })
    .catch((error) => {
      if (error.response.status === 500) {
        toast.error(
          'Uh oh. Something went wrong. If this issue persists, let us know.',
          { id: 'joinGroupError'}
        )
      }
      else if (error.response.status === 400) {
        toast.error(
          error.response.data.message,
          { id: 'joinGroupInvalidRequestError'}
        )
      }
    });
  }

  const createGroup = () => {
    axios.post('/api/groups/create')
    .then(() => {
      toast.success('Successfully created a group!', { id: 'createGroupSuccess' })
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong. If this issue persists, let us know.',
        { id: 'createGroupError'}
      )
    });
  }

  const leaveGroup = () => {
    axios.post('/api/groups/leave')
    .then(() => {
      toast.success('Successfully left your group!', { id: 'leaveGroupSuccess' })
      router.reload()
    })
    .catch(() => {
      toast.error(
        'Uh oh. Something went wrong. If this issue persists, let us know.',
        { id: 'leaveGroupError'}
      )
    });
  }

  const triggerErrorNotification = () => {
    if (Object.keys(errors).length > 0) {
      toast.error('Please input an invite code.', {
        id: 'missingInviteCode',
      })
    }
  }

  return (
    <ProtectedPage title='My Group' restrictions={['signin', 'qualified']}>
      <div className='flex flex-col gap-10 items-center'>
        { session && (session.user.gid === '' ?
          <>
            <div className='flex flex-col max-w-md'>
              <h2>
                Join a Group
              </h2>
              <p>
                Have a group to join? Just enter the invite code below.
              </p>
              <form 
                className='flex flex-col gap-3 w-full sm:max-w-md self-center'
                onSubmit={handleSubmit(joinGroup)}
              >
                <Input
                  type='text'
                  label='Invite Code'
                  variable='invite_code'
                  register={register}
                  errors={errors}
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.03}} 
                  whileTap={{ scale: 0.995 }}
                  type='submit'
                  className='w-full py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
                  onClick={() => triggerErrorNotification()}
                >
                  Join Group
                </motion.button>
              </form>
            </div>
            <div className='flex flex-col max-w-md'>
              <h2>
                Create a Group
              </h2>
              <p>
                Want to make your own group? Click the button below to create a group.
              </p>
              <motion.button
                whileHover={{ scale: 1.03}} 
                whileTap={{ scale: 0.995 }}
                className='w-full py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
                onClick={() => createGroup()}
              >
                Create Group
              </motion.button>
            </div>
          </>
          :
          <div className='flex flex-col max-w-md'>
            <h2>
              My Group
            </h2>
            <p>
              Want others to join your group? Share the invite code below.
            </p>
            <p>
              Note that groups can only contain a max total of 4 hackers.
            </p>
            <h3>
              Invite Code
            </h3>
            <p>
              {session.user.gid}
            </p>
            <h3>
              Members
            </h3>
            <ul className='ml-5 list-disc text-lg'>
              {
                !error && data && 
                data.members.map(({ name }) =>
                  <li>
                    {name.first} {name.last}
                  </li>
                )
              }
            </ul>
          </div>
        )}
        <div className='flex flex-col w-full gap-4 max-w-md'>
          { session && session.user.gid !== '' &&
            <motion.button
              whileHover={{ scale: 1.03}} 
              whileTap={{ scale: 0.995 }}
              className='w-full max-w-lg py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
              onClick={() => setModalOpen(true)}
            >
              Leave Group
            </motion.button>
          }
          <Link passHref href='/'>
            <motion.button
              whileHover={{ scale: 1.03}} 
              whileTap={{ scale: 0.995 }}
              className='w-full max-w-lg py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
            >
              Go Back to Homepage
            </motion.button>
          </Link>
        </div>
      </div>
      <Modal
        title='Leave Group?'
        description='Are you sure you want to leave? If you want to rejoin, you will need to re-input the invite code.'
        show={modalOpen}
        handler={setModalOpen}
      >
        <div className='flex gap-4 w-full'>
          <motion.button
            whileHover={{ scale: 1.03}} 
            whileTap={{ scale: 0.995 }}
            className='w-full max-w-lg py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
            onClick={() => leaveGroup()}
          >
            Confirm
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03}} 
            whileTap={{ scale: 0.995 }}
            className='w-full max-w-lg py-1.5 rounded bg-accent-primary hover:bg-accent-primary-dark font-semibold text-white'
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </motion.button>
        </div>
      </Modal>
    </ProtectedPage>
  )
}