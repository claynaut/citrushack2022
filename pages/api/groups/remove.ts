import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function leaveGroup(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  
  if (session && session.user.admin) {
    const { user, gid } = req.body

    await db.collection('users').updateOne(
      { email: user.email },
      { $set: { gid: '' } }
    );

    const group = await db.collection('groups').find({ gid: gid }).toArray()

    if (group[0].users.length === 1) {
      await db.collection('groups').deleteOne({ gid: gid })
    }
    else {
      const updatedMembers = group[0].users.filter(member => member.email !== user.email)
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