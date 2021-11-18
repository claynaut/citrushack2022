import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function queryGroup(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  
  if (session && session.user.qualified === 'yeah' && session.user.gid !== '') {
    const group = await db.collection('groups').find({ gid: session.user.gid }).toArray()
    const members = group[0].users
    
    res.status(200).json({ members })
  }
  else {
    res.status(401).json({})
  }
}