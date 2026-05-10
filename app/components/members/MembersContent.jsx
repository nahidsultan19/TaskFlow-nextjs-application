"use client"
import { useAuth } from '@/app/hooks/useAuth';
import Image from 'next/image';
import { useState } from 'react';
import { useWorkspace } from '@/app/hooks/useWorkspace';


const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}


const avatarColors = [
    'bg-purple-600',
    'bg-blue-600',
    'bg-green-600',
    'bg-amber-600',
    'bg-pink-600',
]

const MembersContent = () => {
    const { user } = useAuth()
    const { workspace, loading, inviteMember, removeMember } = useWorkspace(user?.uid, user?.email, user?.displayName)
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteLoading, setInviteLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleInvite = async (e) => {
        e.preventDefault()
        setInviteLoading(true)
        setError('')
        setSuccess('')

        if (!inviteEmail.includes('@')) {
            setError('Please enter a valid email address')
            return
        }

        const result = await inviteMember(inviteEmail)
        if (result.success) {
            setSuccess('Invite sent successfully')
            setInviteEmail('')
            setTimeout(() => setSuccess(''), 3000)
        } else {
            setError(result.error)
        }
        setInviteLoading(false)
    }

    const handleRemove = async (memberId) => {
        const result = await removeMember(memberId)
        if (!result.success) {
            setError(result.error)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )

    //Filter out owner from members list
    const members = workspace?.members?.filter((m) => m.role !== 'owner') || []
    const isOwner = workspace?.ownerId === user?.uid

    return (
        <div className='space-y-6 max-w-3xl'>
            {/* header  */}
            <div>
                <h2 className="text-white text-xl font-semibold">Members</h2>
                <p className="text-gray text-sm mt-1">{workspace?.name || 'Your Workspace'}</p>
            </div>

            {/* invite section  */}
            {isOwner && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-white font-medium pb-4">Invite Member</h3>
                    <form onSubmit={handleInvite} className="flex gap-3">
                        <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder='Enter Email address' required className="flex-1 px-4 py-2 5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focu:ring-2 focus:ring-indigo-500" />
                        <button disabled={inviteLoading} className='bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap'>{inviteLoading ? "Sending" : 'Send Invite'}</button>
                    </form>
                    {/* Success message */}
                    {success && (
                        <p className="text-green-400 text-sm mt-3">
                            {success}
                        </p>
                    )}

                    {/* Error message */}
                    {error && (
                        <p className="text-red-400 text-sm mt-3">{error}</p>
                    )}
                </div>
            )}

            {/* Members List  */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {/* Header  */}
                <div className="flex itemd-cernter jutify-between px-6 py-4 border-b border-gray-800">
                    <h3 className="text-white font-medium">
                        Team Members
                    </h3>
                    <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 ml-1 rounded-full">
                        {members.length + 1} members
                    </span>
                </div>
                {/* current user  */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 hover:bg-gray-800/50 transition">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium overflow-hidden flex-shrink-0">
                            {user?.photoURL ? (
                                <Image src={user.photoURL} alt='avatar' width={36} height={36} className='rounded-full object-cover' />
                            ) : (
                                getInitials(user?.displayName || user?.email)
                            )}
                        </div>
                        <div>
                            <p className="text-white text-sm font-medium">
                                {user?.displayName || 'You'}{''}
                                <span className="text-gray-500 font-normal">(You)</span>
                            </p>
                            <p className="text-gray-400 text-xs">{user?.email}</p>
                        </div>
                    </div>
                    <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0 5 rounded-full">
                        Owner
                    </span>
                </div>
                {/* other memebers  */}
                {members.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-gray-400 text-sm">No members yet</p>
                        <p className="text-gray-600 text-xs mt-1">
                            Invite someone to join your workspace
                        </p>
                    </div>
                ) : (

                    members.map((member, index) => (
                        <div key={member._id} className="flex items-center justify-between px-6 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition group">
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 p-2.5 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center text-white text-xs font-medium flex-shrink-0`}>
                                    {getInitials(member.name)}
                                </div>
                                <div>
                                    <p className="text-white text-sm font-medium">{member.name || member.email.split('@')[0]}</p>
                                    <p className="text-gray-400 text-xs">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* status badge  */}
                                <span className={`text-xs px-2 p-0.5 rounded-full border ${member.status === 'active' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-abmer-400 border-abmer-500/20"}`}>
                                    {member.status === 'active' ? "Active" : 'Pending'}
                                </span>
                                {/* role badge  */}
                                <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                                    {member.role}
                                </span>
                                {/* remove button  */}
                                {isOwner && (
                                    <button onClick={() => handleRemove(member._id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 6L6 18M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MembersContent;