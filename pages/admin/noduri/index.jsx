import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import supabase from '@/utils/supabase';
import Postcard from "@/components/Admincard"
import { useUser } from '@auth0/nextjs-auth0/client';

export default function () {
    const [articles, setarticles] = useState([])
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

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("Noduri")
                .select("*")
                .limit(100)
                .order("id", { ascending: true });
            if (error) {
                console.error(error);
                return null;
            }
            setarticles(data);
            console.log(data);

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    
    return (
        <div className='flex flex-col gap-10 w-[1000px]'>
            <button
                onClick={() => routers.push("./noduri/add")}
                className="w-[150px] px-4 py-2 rounded-xl bg-lime-500 ring-2 ring-offset-2 ring-lime-500 mt-6 transition duration-300 ease-in-out hover:ring-offset-4 text-white font-medium outline-2">
                Adauga un nod
            </button>
            <div className='flex flex-col pb-32 rounded-xl w-full sm:px-[0%] px-[8%]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                    {articles.map((item) => (
                        <div className='' key={'ROBOZONE_COMMUNITY_POST_X_' + item.id} onClick={() => routers.push('./noduri/edit/' + item.id)}>
                            <Postcard id={item.id} title={item.nume} likes={item.json? item.json.length : 0} time={item.created_at} util={item.utilizare} dif={item.dificultate}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
