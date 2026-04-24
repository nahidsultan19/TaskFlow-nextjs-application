'use client'

import { auth } from '@/lib/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import LoginForm from '@/app/components/auth/LoginForm'

export default function LoginPage() {

    // const handleEmailLogin = async (e) => {
    //     e.preventDefault()
    //     setLoading(true)
    //     setError('')
    //     const formData = new FormData(e.target)
    //     const email = formData.get('email')
    //     const password = formData.get('password')
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password)
    //         router.push('/dashboard')
    //     } catch (err) {
    //         setError('Invalid email or password')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const handleGoogleLogin = async () => {
    //     setLoading(true)
    //     setError('')
    //     try {
    //         const provider = new GoogleAuthProvider()
    //         await signInWithPopup(auth, provider)
    //         router.push('/dashboard')
    //     } catch (err) {
    //         setError('Google sign in failed')
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">

            <LoginForm />
        </div>
    )
}