import dynamic from 'next/dynamic';
import { useUser } from '@auth0/nextjs-auth0/client';
const Editor = dynamic(
    () => import("../../components/Editorpost"),
    { ssr: false }
);

export default function index() {
    const { user } = useUser()
    console.log(user)
    return (
        <div className='flex flex-col space-y-5'>
            <span className='text-pink-400 text-4xl font-extrabold pt-64'>Gay editor by Rares Zamfira &amp; Robert Paun aka the holers</span>
            {user && <Editor user={user.sub} user_pic={user.picture} user_name={user.nickname} />}
        </div>
    )
}
