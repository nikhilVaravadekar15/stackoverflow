import { db } from '@/lib/db'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import userService from '@/services/user-service'
import { User } from '@prisma/client'
import mailService from '@/services/mail-service'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.username = token.username
            }

            return session
        },
        async signIn({ account, user, email, profile }) {
            const dbUser: User | null = await userService.findUniqueUser(user.email!)

            if (!dbUser) {
                try {
                    mailService.sendMail(dbUser!)
                } catch (error: any) {
                    console.log(error);
                }
            }

            return true
        }
    }
}

export const getAuthSession = async () => await getServerSession(authOptions)
