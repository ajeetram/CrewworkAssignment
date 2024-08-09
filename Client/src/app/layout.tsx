// layout.tsx - Stays as Server Component

import { Metadata } from 'next';
import "./globals.css";
import ClientComponent from './index'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: 'Task Manager',
  description:'developed by Ajeet',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <html lang="en">
      <head>
      </head>
    <body className={inter.className}>
    <ClientComponent>
        {children}
      </ClientComponent>
      </body>
  </html>
    </>
  )
}
