"use client"
import { useAuth } from '@/app/hooks/useAuth';
import Image from 'next/image';
import React, { useState } from 'react';

const mockMembers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Member', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Member', status: 'active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Member', status: 'pending' },
]

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
    const [members, setMembers] = useState(mockMembers)
    const [inviteEmail, setInviteEmail] = useState('')
    const [inviteSent, setInviteSent] = useState(false)
    const [error, setError] = useState('')

    const handleInvite = e => {
        e.preventDefault()
        setError('')

        if (!inviteEmail.includes('@')) {
            setError('Please enter a valid email address')
            return
        }

        const alreadyMember = members.some((m) => m.email === inviteEmail)
        if (alreadyMember) {
            setError('This email is already a member')
            return
        }

        //add to list as pending
        const newMember = {
            id: Date.now(),
            name: inviteEmail.split('@')[0],
            email: inviteEmail,
            role: 'Member',
            status: 'pending',
        }

        setMembers((prev) => [...prev, newMember])
        setInviteEmail('')
        setInviteSent(true)
        setTimeout(() => setInviteSent(false, 3000))
    }

    const handleRemove = id => {
        setMembers((prev) => prev.filter((m) => m.id != id))
    }
    return (
        <div className='space-y-6 max-w-3xl'>
            {/* header  */}
            <div>
                <h2 className="text-white text-xl font-semibold">Members</h2>
                <p className="text-gray text-sm mt-1">Manage your Members</p>
            </div>

            {/* invite section  */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-white font-medium pb-4">Invite Member</h3>
                <form onSubmit={handleInvite} className="flex gap-3">
                    <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder='Enter Email address' required className="flex-1 px-4 py-2 5 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focu:ring-2 focus:ring-indigo-500" />
                    <button className='bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition whitespace-nowrap'>Send Invite</button>
                </form>
                {/* Success message */}
                {inviteSent && (
                    <p className="text-green-400 text-sm mt-3">
                        Invite sent successfully!
                    </p>
                )}

                {/* Error message */}
                {error && (
                    <p className="text-red-400 text-sm mt-3">{error}</p>
                )}
            </div>

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
                    <div className="flex items-center gap-3">
                        <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0 5 rounded-full">
                            Owner
                        </span>
                    </div>
                </div>
                {/* other memebers  */}
                {members.map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between px-6 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition group">
                        <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 p-2.5 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center text-white text-xs font-medium flex-shrink-0`}>
                                {getInitials(member.name)}
                            </div>
                            <div>
                                <p className="text-white text-sm font-medium">{member.name}</p>
                                <p className="text-gray-400 text-xs">{member.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* status badge  */}
                            <span className={`text-xs px-2 p-0.5 rounded-full border ${member.status === 'active' ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-abmer-400 border-abmer-500/20"}`}>
                                {member.status === 'active' ? "Active" : 'Pending'}
                            </span>
                            {/* role badge  */}
                            <span className="text-xs bg-gray-700 text-gray-300 px-2 py-2 5 rounded-full">
                                {member.role}
                            </span>
                            {/* remove button  */}
                            <button onClick={() => handleRemove(member.id)} className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MembersContent;