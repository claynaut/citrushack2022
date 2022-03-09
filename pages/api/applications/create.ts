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
      phone_number,
      food_preference,
      shirt_size,
      school,
      major,
      grade,
      grad_date,
      first_time,
      participation,
      criteria_met,
      MLH_code_of_conduct,
      MLH_privacy_policy,
      MLH_communication
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
          uid,
          gid: '',
          name: {
            first: first_name,
            last: last_name,
          },
          gender,
          race: ethnicity,
          phoneNumber: phone_number,
          foodPreference: food_preference,
          shirtSize: shirt_size,
          school,
          major,
          grade,
          graduationDate: grad_date,
          firstTimeHacker: first_time,
          participation,
          criteriaMet: criteria_met,
          MLHAcknowledgement: Boolean(MLH_code_of_conduct && MLH_privacy_policy && MLH_communication),
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