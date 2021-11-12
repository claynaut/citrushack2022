import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { getSession } from 'next-auth/client'

export default async function createApplication(req: NextApiRequest, res: NextApiResponse) {
  // const session = await getSession({ req });
  // if (session) {
    const { db } = await connectToDatabase();
    const {
      status,
      id
    } = req.body;
    
    await db.collection('apps').update(
      { userId: id },
      { qualified: status }
    );
  
    res.status(200).json({});
  // }
  // else {
  //   res.status(401).json({});
  // }
}