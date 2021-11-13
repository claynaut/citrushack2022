import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function queryApplications(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (session && session.user.admin) {
    const db = (await clientPromise).db(process.env.MONGODB_DB)
    
    const apps = await db.collection('users').find({ uid: { $exists: true } }).toArray()

    res.status(200).json({ apps })
  }
  else {
    res.status(401).json({})
  }
}