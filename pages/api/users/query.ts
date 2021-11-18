import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function queryApplications(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)

  if (session && session.user.admin) {
    const users = await db.collection('users').find().toArray()

    res.status(200).json({ users })
  }
  else {
    res.status(401).json({})
  }
}