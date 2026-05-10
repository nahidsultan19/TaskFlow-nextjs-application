"use client"

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const SignupForm = () => {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false)
    const { user, loading } = useAuth();
    const [error, setError] = useState("")
    const isSigninUp = useRef(false)



    useEffect(() => {
        if (!loading && user && !isSigninUp.current) {
            router.push("/dashboard")
        }
    }, [user, loading])


    const handleSignUp = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("")

        isSigninUp.current = true

        const formData = new FormData(e.target);
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirm = formData.get("confirm")

        if (password !== confirm) {
            setError("Password do not match")
            setSubmitting(false);
            isSigninUp.current = false;
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            setSubmitting(false);
            isSigninUp.current = false;
            return
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(result.user, { displayName: name });
            await signOut(auth)
            toast.success("Account Created Successfully!")
            router.push("/login?registered=true")
        } catch (error) {
            isSigninUp.current = false;
            if (error.code === "auth/email-already-in-use") {
                setError("Email is already registered")
            } else {
                setError("Something went worng. Please try again")
            }
        } finally {
            setSubmitting(false)
        }
    }


    // google login
    const handleGoogleSignup = async () => {
        setSubmitting(true)
        setError('')
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            router.push('/dashboard')
        } catch (err) {
            setError('Google sign in failed')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return null
    if (user) return null


    return (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-md p-8">

            {/* Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="2" width="5" height="5" rx="1" fill="white" />
                            <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                            <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6" />
                            <rect x="9" y="9" width="5" height="5" rx="1" fill="white" />
                        </svg>
                    </div>
                    <span className="text-lg font-semibold text-white">TaskFlow</span>
                </div>
                <p className="text-gray-400 text-sm">Create your account</p>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-500/10 text-red-400 text-sm px-4 py-3 rounded-lg mb-4 border border-red-500/20">
                    {error}
                </div>
            )}



            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1.5">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1.5">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1.5">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-400 block mb-1.5">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirm"
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-800" />
                <span className="text-xs text-gray-500">or continue with</span>
                <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Google */}
            <button
                onClick={handleGoogleSignup}
                disabled={submitting}
                className="w-full border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg width="16" height="16" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                Continue with Google
            </button>

            <p className="text-center text-xs text-gray-500 mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Sign in
                </Link>
            </p>

        </div>
    );
};

export default SignupForm;