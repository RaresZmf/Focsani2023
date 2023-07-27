import { useRouter } from 'next/router';
import supabase from '@/utils/supabase';
import React, { useState, useEffect } from 'react';

import dynamic from "next/dynamic";
const EditorEdit = dynamic(
    () => import("@/components/EditorEdit"),
    { ssr: false }
);
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';


export default function ViewPost() {
    const [post, setPost] = useState(null);
    const router = useRouter();
    const { user } = useUser();
    const [content, setcontent] = useState('');
    const [isPostLoaded, setIsPostLoaded] = useState(false); // Variabila de stare pentru a urmări încărcarea completă a postului
    const [title, settitle] = useState(post?.title)
    const [isadmin, setisadmin] = useState(false)

    console.log(1)

    async function fetchAdmin() {
        const { data, error } = await supabase
            .from('userdata')
            .select("admin")
            .eq("auth0id", user.sub)
            .limit(1);
        setisadmin(data[0].admin)
        console.log(isadmin);
        if(!data[0].admin){router.push('/')}
    }

    async function fetchData(id) {
        try {
            const { data, error } = await supabase
                .from('msg')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
                return null;
            }

            console.log(data);
            setPost(data);
            setIsPostLoaded(true); // Setăm variabila de stare la true după ce postul a fost încărcat complet
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function deleteMsg() {
        const { error } = await supabase
            .from('msg')
            .update('archive', true )
            .eq('id', post.id)

        router.push('/admin/mesaje')
    }

    useEffect(() => {
        fetchData(router.query.id);
        fetchAdmin();
    }, []);

    if (isadmin == true) {
        return (
            <>
                <div className='flex flex-col items-center space-y-10 py-24 text-gray-700'>
                    <div className='flex flex-row justify-center text-center break-words'>
                        <span className='text-2xl sm:text-4xl md:text-6xl font-bold underline decoration-lime-500 w-[80vw] max-w-[800px]'>{post?.title}</span>
                    </div>
                    <div className='flex flex-row items-center content-center justify-center space-x-5'>
                        <div className='flex flex-col justify-center items-start content-start'>
                            <span className='text-center font-bold text-lg'>{post?.email}</span>
                        </div>
                    </div>
                    <textarea className='w-[700px] h-[200px]' value={post?.content}></textarea>
                    <button
                        onClick={deleteMsg}
                        className="w-[250px] font-bold font-4xl px-4 py-2 rounded-xl bg-lime-500 ring-2 ring-offset-2 ring-lime-500 mt-6 transition duration-300 ease-in-out hover:ring-offset-4 text-white outline-2">
                        Marcheaza drept citit
                    </button>
                </div>
            </>
        );
    }
    else {
        return (
            <div className='flex flex-row justify-center content-center items-center'>
                <p className='text-black font-bold text-3xl underline decoration-4 decoration-blue-500'>Nu ai acces sef</p>
            </div>
        )

    }
}