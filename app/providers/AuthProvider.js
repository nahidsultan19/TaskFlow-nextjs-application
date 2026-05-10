"use client"

import { useState, useEffect } from "react"
import { AuthContext } from "../context"
import { useRouter } from "next/navigation"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const activateMembership = async (firebaseUser) => {
        try {
            const res = await fetch('/api/workspaces/activate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: firebaseUser.email,
                    userId: firebaseUser.uid,
                    name: firebaseUser.displayName || '',
                }),
            })
            const data = await res.json()
        } catch (error) {
            console.error('Failed to activate membership:', error)
        }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false)

            // when user logs in check if they have pending invites
            if (firebaseUser) {
                activateMembership(firebaseUser)
            }
        })

        return () => unsubscribe();
    }, [])


    const logout = async () => {
        await signOut(auth);
        toast.success('Logged out successfully!')
        router.push("/login")
    }


    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;