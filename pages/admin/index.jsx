import React from 'react'
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Image from 'next/image';

function index() {

    const { user, isLoading } = useUser();

    return (
        <div className='flex flex-col items-center justify-start'>
            <div className=' text-5xl py-[70px] text-lime-500'>Admin panel</div>
            <div className='grid grid-cols-3 gap-10'>
                <div className='border-primary text-3xl bg-lime-500 text-bold text-white rounded-xl px-[50px] text-center py-[60px]'>Noduri</div>
                <div className='border-primary text-3xl text-bold bg-lime-500 text-white rounded-xl px-[50px] text-center py-[60px]'>Utilizatori</div>
                <div className='border-primary text-3xl text-bold bg-lime-500 text-white rounded-xl px-[50px] text-center py-[60px]'>Notificari</div>
            </div>
            <div>
            <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690400726/Walkie-talkiepng_i9u2bs.png"} className="p-[40px]" width={300} height={300}></Image> 
            </div>
        </div>
    )
}

export default withPageAuthRequired(index, {
    onRedirecting: () => '',
});