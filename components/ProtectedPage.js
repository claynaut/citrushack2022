import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import Layout from '@/components/Layout'

export default function ProtectedPage({ title, restrictions, children }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (status !== 'loading' && !session) {
      if (restrictions.includes('signin')) {
        toast.error('Access denied. Please sign in first!', {id: 'signinRestriction'})
        router.push('/')
      }
    }
    else if (status !== 'loading' && session) {
      if (restrictions.includes('admin') && !session.user.admin) {
        toast.error('Access denied. Unauthorized user.', {id: 'adminRestriction'})
        router.push('/')
      }
      if (restrictions.includes('applied') && session.user.uid) {
        toast.error('Access denied. You already applied!', {id: 'appliedAlreadyRestriction'})
        router.push('/')
      }
      if (restrictions.includes('qualified') && !session.user.qualified) {
        toast.error('Access denied. Unauthorized user.', {id: 'qualifiedRestriction'})
        router.push('/')
      }
    }
    setMounted(true)
  }, [status, session, router, mounted])

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
          session && (restrictions.includes('signin')
          || (restrictions.includes('admin') && session.user.admin)
          || (restrictions.includes('applied') && !session.user.uid)
          || (restrictions.includes('qualified') && session.user.qualified)) && 
          <>
            {children}
          </> 
        }
      </section>
    </Layout>
  )
}
