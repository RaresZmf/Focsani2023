import React from 'react'
import { useState } from 'react'
import supabase from '@/utils/supabase'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'

export default function ticket() {
    const [prioritate, setprioritate] = useState(false)
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')

    const routers = useRouter()
    const { user, isLoading } = useUser();

    async function sendTicket() {
        const { error } = await supabase
            .from('msg')
            .insert({ email: user.email, auth0: user.sub, priority: prioritate, title: title, content: content })
        
            routers.push('./')
    }

    return (
        <div className='flex flex-col items-center space-y-8 mt-[200px]'>
            <span className='py-[20px] font-bold text-8xl bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-lime-200'>
                Trimite un mesaj
            </span>
            <input className='whitespace-break-spaces w-[700px] text-gray-700' placeholder='titlu' onChange={(e) => settitle(e.target.value)} />
            <textarea className='w-[700px] h-[200px] text-gray-700' placeholder='Continut' type="text" onChange={(e) => setcontent(e.target.value)} />
            <div>
                <input className="" id='prioritate' type="checkbox" onClick={() => setprioritate(!prioritate)}></input> <label className="text-gray-500" for="prioritate">Prioritate</label>
            </div>
            <button
                onClick={sendTicket}
                className="w-[150px] px-4 py-2 rounded-xl bg-lime-500 ring-2 ring-offset-2 ring-lime-500 transition duration-300 ease-in-out hover:ring-offset-4 text-white font-medium outline-2">
                Trimite mesajul
            </button>
        </div>
    )
}
