/* eslint-disable jsx-a11y/html-has-lang */
import './globals.css'
import { Metadata } from 'next'
import { Dosis } from '@next/font/google'
import UserProvider from '@/contexts/userContext'
import ToastContainer from '@/components/ToastContainer'
import Header from '../components/Header'

import 'server-only'

import SupabaseListener from '../components/SupabaseListener'
import SupabaseProvider from '../components/SupabaseProvider'
import { createServerClient } from '../utils/supabase-server'

const font = Dosis({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const revalidate = 0

export const metadata: Metadata = {
  title: 'myRoutine',
  description: 'Create and share personalized workout routines.',
  icons: '/favicon.ico',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html data-theme="mytheme">
      <head />
      <body
        className={`flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-base-200 from-75% to-primary/10 ${font.className} `}
      >
        <SupabaseProvider session={session}>
          <UserProvider>
            <SupabaseListener />
            <Header />
            <div className="container mx-auto py-4 md:py-8">{children}</div>
            <ToastContainer />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
