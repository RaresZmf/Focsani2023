import React from 'react';
import dynamic from 'next/dynamic';
import { useUser } from '@auth0/nextjs-auth0/client';
const Editor = dynamic(
    () => import("@/components/Editoradd"),
    { ssr: false }
);
import { useRouter } from 'next/router';
import supabase from '@/utils/supabase';
import { useEffect } from 'react';

export default function add() {
    const routers = useRouter();
    const { user, isLoading } = useUser();

    async function fetchAdmin() {
        const { data, error } = await supabase
            .from('userdata')
            .select("admin")
            .eq("auth0id", user.sub)
            .limit(1);
        if(!data[0].admin){routers.push('/')}
    }
    useEffect(() => {
        fetchAdmin()
    }, [])
    return (
        <div className='flex flex-col space-y-5'>
            {user && <Editor user={user.sub} user_pic={user.picture} user_name={user.nickname} />}
        </div>
    )
}
