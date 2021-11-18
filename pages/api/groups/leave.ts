import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function leaveGroup(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  
  if (session && session.user.qualified === 'yeah' && session.user.gid !== '') {
    await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { gid: '' } }
    );

    const group = await db.collection('groups').find({ gid: session.user.gid }).toArray()

    if (group[0].users.length === 1) {
      await db.collection('groups').deleteOne({ gid: session.user.gid })
    }
    else {
      const updatedMembers = group[0].users.filter(user => user.email !== session.user.email)
      await db.collection('groups').updateOne(
        { gid: session.user.gid },
        { $set: { users: updatedMembers } }
      )
    }
  
    res.status(200).json({})
  }
  else {
    res.status(401).json({})
  }
}