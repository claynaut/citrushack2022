import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function reviewManyApplications(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  if (session && session.user.admin) {
    const {
      status,
      criteria_met
    } = req.body
    
    await db.collection('users').update(
      { criteriaMet: criteria_met },
      { qualified: status },
      { multi: true }
    )
  
    res.status(200).json({})
  }
  else {
    res.status(401).json({})
  }
}