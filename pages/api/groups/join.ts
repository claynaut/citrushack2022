import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { sendEmail } from '@/lib/sendgrid'
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
      // get names of group members to send in email
      var groupMembers = ''
      if (group[0].users.length >= 1) {
        groupMembers += group[0].users[0].name.first
      }
      if (group[0].users.length == 2) {
        groupMembers += ' and '
      }
      else if (group[0].users.length == 2) {
        groupMembers += ', '
      }
      if (group[0].users.length >= 2) {
        groupMembers += group[0].users[1].name.first
      }
      if (group[0].users.length === 3) {
        groupMembers += ', and ' + group[0].users[2].name.first
      }

      // send email notification to user joining
      await sendEmail({
        email: session.user.email,
        template_id: process.env.JOIN_GROUP_EMAIL_ID,
        name: session.user.name.first,
        members: groupMembers,
        invite_code: invite_code,
        newcomer: ''
      })

      // send email notification to group that user joined
      for (let i = 0; i < group.length; i++) {
        await sendEmail({
          email: group[0].users[i].email,
          template_id: process.env.NEW_JOIN_EMAIL_ID,
          name: '',
          members: '',
          invite_code: invite_code,
          newcomer: session.user.name.first
        })
      }

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