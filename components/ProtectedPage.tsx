import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Layout from '@/components/Layout'

interface Props {
  children: React.ReactNode | React.ReactNode[]
  restrictions: string[]
  title?: string
}

export default function ProtectedPage({ title, restrictions, children }: Props) {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      if (restrictions.includes('signin')) {
        toast.error('Access denied. Please sign in first!', {id: 'signinRestriction'})
        router.push('/')
      }
    }
    else if (status === 'authenticated') {
      if (restrictions.includes('admin') && !session.user.admin) {
        toast.error('Access denied. Unauthorized user.', {id: 'adminRestriction'})
        router.push('/')
      }
      if (restrictions.includes('applied') && session.user.uid) {
        // toast.error('Access denied. You already applied!', {id: 'appliedAlreadyRestriction'})
        router.push('/')
      }
      if (restrictions.includes('qualified') && session.user.qualified !== 'yeah') {
        toast.error('Access denied. Unauthorized user.', {id: 'qualifiedRestriction'})
        router.push('/')
      }
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <Layout>
        <Head>
          <title>Citrus Hack 2022 { title && ('| ' + title) }</title>
        </Head>
        <section className='flex flex-col w-full items-center'>
          Loading...
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Citrus Hack 2022 { title && ('| ' + title) }</title>
      </Head>
      <section className='flex flex-col w-full'>
        {
          status === 'authenticated' && (restrictions.includes('signin')
          || (restrictions.includes('admin') && session.user.admin)
          || (restrictions.includes('applied') && !session.user.uid)
          || (restrictions.includes('qualified') && session.user.qualified === 'yeah')) && 
          <>
            {children}
          </> 
        }
      </section>
    </Layout>
  )
}
