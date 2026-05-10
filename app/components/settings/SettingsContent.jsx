"use client"

import { useAuth } from "@/app/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SettingsContent = () => {
    const { user, logout } = useAuth()
    const router = useRouter()

    // display name state 
    const [displayName, setDisplayName] = useState(user?.displayName || '')
    const [nameLoading, setNameLoading] = useState(false)
    const [nameError, setNameError] = useState('')

    // password state 
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordSuccess, setPasswordSuccess] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Delete account state
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

    const handleUpdateName = async (e) => {
        e.preventDefault();
        setNameLoading(true)
        setNameError('')
        setNameSuccess('')

        const formData = new FormData(e.target)
        const newName = formData.get('displayName')

        try {
            await updateProfile(auth.currentUser, { displayName: newName })
            toast.success('Name updated successfully!')
            setNameSuccess('Name updated successfully')
        } catch (error) {
            toast.error(error.message)
            setNameError(error.message)
        } finally {
            setNameLoading(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setPasswordLoading(true)
        setPasswordError("")
        setPasswordSuccess('')

        const formData = new FormData(e.target)
        const currentPassword = formData.get("currentPassword")
        const newPassword = formData.get('newPassword')
        const confirmPassword = formData.get('confirmPassword')

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match')
            setPasswordLoading(false)
            return
        }

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long")
            setPasswordLoading(false)
            return
        }

        try {
            // Reauthenticate first
            const credential = EmailAuthProvider.credential(user.email, currentPassword)
            await reauthenticateWithCredential(auth.currentUser, credential)
            await updatePassword(auth.currentUser, newPassword)
            toast.success('Password updated successfully!')
            setPasswordSuccess("Password updated successfully")
            e.target.reset()
        } catch (error) {
            toast.error(error.message)
            if (error.code === 'auth/wrong-password') {
                setPasswordError('CUrrent password is incorrect')
            } else if (error.code === 'auth/too-many-request') {
                setPasswordError('Too many attempts. Please try again later')
            } else {
                setPasswordError(error.message)
            }
        } finally {
            setPasswordLoading(false)
        }
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setDeleteLoading(true)
        setDeleteError('')

        const formData = new FormData(e.target)
        const password = formData.get('deletePassword')

        try {
            const credential = EmailAuthProvider.credential(user.email, password)
            await reauthenticateWithCredential(auth.currentUser, credential)
            await deleteUser(auth.currentUser)
            toast.success('Account deleted Successfully!')
            router.push('/signup')
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setDeleteError('Passowrd is incorrect')
            } else {
                setDeleteError(error.message)
            }
        } finally {
            setDeleteLoading(false)
        }
    }

    const getInitials = name => {
        if (!name) return 'U'
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    }

    const isGoogleUser = user?.providerData?.[0]?.providerId === 'google.com'

    return (
        <div className="max-w-2xl scroll-y">
            {/* header  */}
            <div>
                <h2 className="text-xl font-semibold text-white">Settings</h2>
                <p className="text-gray-400 text-sm mt-1">Manage your account settings</p>
            </div>

            {/* profile info  */}

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-white fontmedium mb-4">Profile</h3>
                {/* avatar  */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center font-medium text-xl overflow-hidden">
                        {user?.photoURL ? (
                            <Image src={user.photoURL} alt="avatar" width={64} height={64} className="rounded-full object-cover" />
                        ) : (getInitials(user?.displayName || user?.email))}
                    </div>
                    <div>
                        <p className="text-white font-medium">{user?.displayName}</p>
                        <p className="text-gray-400 text-sm">{user?.email}</p>
                        {isGoogleUser && (
                            <span className="text xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0 5 rounded-full mt-1 inline-block">
                                Google account
                            </span>
                        )}
                    </div>
                </div>

                {/* update name form  */}
                <form onSubmit={handleUpdateName} className="space-y-6">
                    <div>
                        <label htmlFor="" className="text-xs font-medium text-gray-400 block mb-1 5">Display Name</label>
                        <input type="text" name="displayName" defaultValue={user?.displayName || ''} placeholder="Your Name" required className="w-full px-4 py-2 5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    {nameError && (
                        <p className="text-red-400 text-sm">{nameError}</p>
                    )}

                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50">
                        {nameLoading ? 'Saving' : 'Save Name'}
                    </button>
                </form>
            </div>
            {!isGoogleUser && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-medium mb-4">Change Password</h3>
                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-1.5">
                                Current Password
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-1.5">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-400 block mb-1.5">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {passwordSuccess && (
                            <p className="text-green-400 text-sm">{passwordSuccess}</p>
                        )}
                        {passwordError && (
                            <p className="text-red-400 text-sm">{passwordError}</p>
                        )}
                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                        >
                            {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            )}

            {/* danger zone */}
            <div className="bg-gray-900 border border-red-500/20 rounded-xl p-6">
                <h3 className="text-red-400 font-medium mb-1">Dancer zone</h3>
                <p className="text-gray-400 text-sm mb-4">
                    Onece you delete your account all your data will be permanently removed.
                </p>
                {!showDeleteConfirm ? (
                    <button onClick={() => setShowDeleteConfirm(true)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition">Delete Account</button>
                ) : (
                    <form onSubmit={handleDeleteAccount} className="space-y-4">
                        <p className="text-gray-300 text-sm">
                            Please enter your password to confirm account deletion.
                        </p>
                        {!isGoogleUser && (
                            <div>
                                <label htmlFor="" className="text-xs font-medium text-gray-400 block mb-1 5">
                                    Your Password
                                </label>
                                <input type="password" name="deletePassword" placeholder="••••••••" required className="w-full px-4 py-2 5 rounded-lg bg-gray-800 boder border-red-500/20 text-white text-sm placeholder-gray-500 focus:outline focus:ring-2 focus:ring-red-500" />
                            </div>
                        )}
                        {deleteError && (
                            <p className="text-red-400 text-sm">{deleteError}</p>
                        )}
                        <div className="flex gap-3">
                            <button onClick={() => setShowDeleteConfirm(false)} type="button" className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 text-sm hover:bg-gray-800 transition">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={deleteLoading}
                                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
                            >
                                {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SettingsContent;