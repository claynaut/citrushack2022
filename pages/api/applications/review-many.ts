import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { getSession } from 'next-auth/client'

export default async function createApplication(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });
  // if (session) {
    const { db } = await connectToDatabase();
    const {
      status,
      criteria_met
    } = req.body;
    
    await db.collection('apps').update(
      { criteriaMet: criteria_met },
      { qualified: status },
      { multi: true }
    );
  
    res.status(200).json({});
  // }
  // else {
  //   res.status(401).json({});
  // }
}