import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      uid: string
      gid: string
      name: {
        first: string
        last: string
      }
      qualified: string
      admin: boolean
      checkedIn: boolean
      participation: string
    }
  }
  interface User {
    uid: string
    gid: string
    name: {
      first: string
      last: string
    }
    qualified: string
    admin: boolean
    checkedIn: boolean
    participation: string
  }
}