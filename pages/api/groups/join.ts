import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function joinGroup(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  
  if (session && session.user.qualified === 'yeah' && session.user.gid === '') {
    const { invite_code } = req.body

    const group = await db.collection('groups').find({ gid: invite_code }).toArray()

    if (group.length === 0) {
      res.status(400).json({ message: 'Invalid request. Group does not exist.' })
    }
    else if (group[0].users.length === 4) {
      res.status(400).json({ message: 'Invalid request. Group is full!' })
    }
    else {
      await db.collection('users').updateOne(
        { email: session.user.email },
        { $set: { gid: invite_code } }
      )

      const updatedMembers = group[0].users
      updatedMembers.push(
        {
          id: session.user.uid,
          email: session.user.email,
          name: {
            first: session.user.name.first,
            last: session.user.name.last
          }
        }
      )

      await db.collection('groups').updateOne(
        { gid: invite_code },
        { $set: { users: updatedMembers } }
      )

      res.status(200).json({})
    }
  }
  else {
    res.status(401).json({})
  }
}