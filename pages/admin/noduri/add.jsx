import React from 'react';
import dynamic from 'next/dynamic';
import { useUser } from '@auth0/nextjs-auth0/client';
const Editor = dynamic(
    () => import("../../../components/Editoradd"),
    { ssr: false }
);

export default function add() {
    const { user } = useUser()
    return (
        <div className='flex flex-col space-y-5'>
            {user && <Editor user={user.sub} user_pic={user.picture} user_name={user.nickname} />}
        </div>
    )
}
