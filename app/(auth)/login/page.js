'use client'

import LoginForm from '@/app/components/auth/LoginForm'

// export const metadata = {
//     title: 'Login | TaskFlow',
//     description: 'Sign in to your TaskFlow account',
// }

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <LoginForm />
        </div>
    )
}