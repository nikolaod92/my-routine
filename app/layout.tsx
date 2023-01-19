import "./globals.css";
import Header from "./header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="cupcake">
      <head />
      <body>
        {/* @ts-expect-error Server Component */}
        <Header />
        {children}
      </body>
    </html>
  );
}
