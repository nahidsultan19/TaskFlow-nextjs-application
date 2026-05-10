import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import connectDB from "@/lib/mongodb";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TaskFlow",
  description: "Team Productivity app",
};

export default async function RootLayout({ children }) {

  await connectDB()
  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full h-full flex flex-col bg-gray-950" suppressHydrationWarning>
        <AuthProvider>
          <main className="">
            {children}
            <Toaster position="top-right" toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
                borderRadius: '10px',
                fontSize: '14px'
              },
              success: {
                iconTheme: {
                  primary: '#6366f1',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff'
                },
              },
            }} />
          </main>
        </AuthProvider>

      </body>
    </html>
  );
}
