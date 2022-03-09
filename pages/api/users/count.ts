import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function countUsers(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)

  if (session) {
    const users = await db.collection('users').find().toArray()
    const numUsers = Object.keys(users).length

    res.status(200).json({ numUsers })
  }
  else {
    res.status(401).json({})
  }
}