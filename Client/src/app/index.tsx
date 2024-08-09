// SomeClientComponent.tsx

'use client'
import { Toaster } from "react-hot-toast";
import { MyProvider } from './context/MyContext';

export default function index({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <MyProvider>
    <Toaster position="top-center" />
      {children}
      </MyProvider>
  )
}