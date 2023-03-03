/* eslint-disable jsx-a11y/html-has-lang */
import "./globals.css";
import { Inter } from "@next/font/google";
import Header from "./header";

import "server-only";

import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import { createServerClient } from "../utils/supabase-server";

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <html data-theme="dracula">
      <head />
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Header />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
