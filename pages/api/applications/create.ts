import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { sendEmail } from '@/lib/sendgrid'
import { getSession } from 'next-auth/react'

export default async function createApplication(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  const db = (await clientPromise).db(process.env.MONGODB_DB)
  if (session) {
    const {
      uid,
      first_name,
      last_name,
      gender,
      ethnicity,
      school,
      major,
      grade,
      grad_date,
      first_time,
      criteria_met
    } = req.body

    // send email notification to user applying
    await sendEmail({
      email: session.user.email,
      template_id: process.env.APP_CONFIRMATION_EMAIL_ID,
      name: first_name,
      members: '',
      invite_code: '',
      newcomer: ''
    })
    
    await db.collection('users').updateOne(
      {
        email: session.user.email
      },
      {
        $set: {
          uid: uid,
          gid: '',
          name: {
            first: first_name,
            last: last_name,
          },
          race: ethnicity,
          gender: gender,
          school: school,
          major: major,
          grade: grade,
          graduationDate: grad_date,
          firstTimeHacker: first_time,
          criteriaMet: criteria_met,
          qualified: '',
          admin: false,
          appliedAt: new Date()
        }
      }
    )
  
    res.status(200).json({})
  }
  else {
    res.status(401).json({})
  }
}