import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { sendEmail } from '@/lib/sendgrid'
import { getSession } from 'next-auth/react'

export default async function rereviewApplication(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  if (session && session.user.admin) {
    const { users } = req.body

    // send email notification about user's application status and update current status
    for (let i = 0; i < users.length; i++) {
      await sendEmail({
        email: users[i].email,
        template_id: process.env.APP_REREVIEWED_EMAIL_ID,
        name: users[i].name.first,
        members: '',
        invite_code: '',
        newcomer: ''
      })
      await db.collection('users').updateOne(
        { uid: users[i].uid },
        { $set: { qualified: 'yeah' } }
      )
    }
  
    res.status(200).json({})
  }
  else {
    res.status(401).json({})
  }
}