import { useRouter } from 'next/router';
import supabase from '@/utils/supabase';
import React, { useState, useEffect } from 'react';

import dynamic from "next/dynamic";
const EditorView = dynamic(
    () => import("@/components/EditorView"),
    { ssr: false }
);
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';


export default function ViewPost() {
    const [post, setPost] = useState(null);
    const router = useRouter();
    const [already_liked, setalready_liked] = useState(false)
    const [likes, setlikes] = useState(0)
    const [peopleLiked, setpeopleLiked] = useState([])
    const { user } = useUser();
    const [content, setcontent] = useState('');
    const [isPostLoaded, setIsPostLoaded] = useState(false); // Variabila de stare pentru a urmări încărcarea completă a postului
    const [title, settitle] = useState(post?.title)
    const originalTitle = post?.title;
    const [isadmin, setisadmin] = useState(false)

    console.log(1)

    // async function fetchAdmin() {
    //     const { data, error } = await supabase
    //         .from('userdata')
    //         .select("admin")
    //         .eq("auth0id", user.sub)
    //         .limit(1);
    //     setisadmin(data[0].admin)
    //     console.log(isadmin);
    // }

    async function fetchData(id) {
        try {
            const { data, error } = await supabase
                .from('Noduri')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
                return null;
            }

            console.log(data);
            setPost(data);
            setcontent(data.content);
            setpeopleLiked(data.liked)
            setIsPostLoaded(true); // Setăm variabila de stare la true după ce postul a fost încărcat complet
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    useEffect(() => {
        fetchData(router.query.id);
    }, []);
        return (
            <>
                <div className='flex flex-col items-center space-y-10 py-24 pt-4'>
                    <div className='flex flex-row justify-center text-center break-words'>
                        <span className='text-2xl sm:text-4xl md:text-6xl text-black font-bold underline decoration-blue-500 w-[80vw] max-w-[800px]'>{post?.title}</span>
                    </div>
                    <div className='flex flex-row items-center content-center justify-center space-x-5'>
                        {/* <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690467530/Carabine_zax6vp.png"} width={200} height={200} alt='' className='rounded-full shadow ml-[300px]' /> */}
                        <div className='flex flex-col justify-center items-start content-start'>
                            <span className='text-center font-bold underline decoration-blue-500 decoration-4 text-lg'>{post?.creator_name}</span>
                        </div>
                    </div>
                    {isPostLoaded && <EditorView id={post.id} title={post.nume} json={post.json} utility={post.utilizare} dif={post.dificultate} />}
                </div>
            </>
        );
}