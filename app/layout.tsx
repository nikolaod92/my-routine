/* eslint-disable jsx-a11y/html-has-lang */
import './globals.css'
import { Roboto_Condensed } from 'next/font/google'
import UserRoutineProvider from '@/contexts/userRoutine'
import Header from '../components/Header'

import 'server-only'

import SupabaseListener from '../components/SupabaseListener'
import SupabaseProvider from '../components/SupabaseProvider'
import { createServerClient } from '../utils/supabase-server'

const font = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

export const revalidate = 0

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
        className={`flex flex-col min-h-screen bg-base-200 ${font.className} `}
      >
        <SupabaseProvider session={session}>
          <UserRoutineProvider>
            <SupabaseListener serverAccessToken={session?.access_token} />
            <Header />
            <div className="container mx-auto py-4 md:py-8">{children}</div>
          </UserRoutineProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
