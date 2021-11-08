import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { getSession } from 'next-auth/client'

export default async function createApplication(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });
  // if (session) {
    const { db } = await connectToDatabase();
    const {
      first_name,
      last_name,
      gender,
      ethnicity,
      school,
      major,
      grade,
      grad_date,
      first_time,
      id
    } = req.body;
    
    await db.collection('apps').insertOne({
      firstName: first_name,
      lastName: last_name,
      race: ethnicity,
      gender: gender,
      school: school,
      major: major,
      grade: grade,
      graduationDate: grad_date,
      firstTimeHacker: first_time,
      userId: id,
      qualified: '',
      groupId: '',
      admin: '',
      createdAt: new Date()
    });
  
    res.status(200).json({});
  // }
  // else {
  //   res.status(401).json({});
  // }
}