import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { getSession } from 'next-auth/react'

export default async function checkin(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  if (session) {
    const { 
      uid,
      participation,
      MLH_code_of_conduct,
      address
    } = req.body

    const dailyWellnessCheck = (participation === 'In-Person') ? 'Completed' : 'N/A'
    const actualAddress = (address === '') ? 'Lives Outside the U.S.' : address

    await db.collection('users').updateOne(
      { uid },
      { $set: { 
          participation,
          dailyWellnessCheck,
          readMLHCodeOfConduct: Boolean(MLH_code_of_conduct),
          address: actualAddress,
          checkedIn: true
        } 
      }
    )
  
    res.status(200).json({})
  }
  else {
    res.status(401).json({})
  }
}