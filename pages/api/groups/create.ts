import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'
import { nanoid } from 'nanoid'

export default async function createGroup(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (session && session.user.qualified === 'yeah') {
    const db = (await clientPromise).db(process.env.MONGODB_DB)
    const newGroupId = nanoid()
    
    await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { gid: newGroupId } }
    )

    await db.collection('groups').insertOne(
      {
        gid: newGroupId,
        users: [
          {
            id: session.user.uid,
            email: session.user.email,
            name: {
              first: session.user.name.first,
              last: session.user.name.last
            }
          }
        ],
        createdAt: new Date()
      }
    )
  
    res.status(200).json({})
  }
  else {
    res.status(401).json({})
  }
}