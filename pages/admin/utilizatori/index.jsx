import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import supabase from '@/utils/supabase';
import Postcard from "@/components/UserCard"
export default function () {
    const [articles, setarticles] = useState([])
    const routers = useRouter()

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("userdata")
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

    async function changeStatus(id, admin) {
        const { error } = await supabase
            .from('userdata')
            .update({ admin: !admin})
            .eq('id', id)
        routers.reload()
    }

    return (
        <div className='flex flex-col gap-10 w-[1000px]'>
            <div className='flex flex-col pb-32 rounded-xl w-full sm:px-[0%] px-[8%]'>
                <span className='py-[20px] font-bold text-8xl bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-lime-200'>
                    Utilizatori
                </span>
                <div className='grid grid-cols-1 gap-7'>
                    {articles.map((item) => (
                        <div className='flex flex-row space-x-10' key={'ROBOZONE_COMMUNITY_POST_X_' + item.id}>
                            <Postcard email={item.email} admin={item.admin} />
                            <button
                                onClick={function () { changeStatus(item.id, item.admin) }}
                                className="w-[150px] px-4 py-2 rounded-xl bg-lime-500 ring-2 ring-offset-2 ring-lime-500 transition duration-300 ease-in-out hover:ring-offset-4 text-white font-medium outline-2">
                                Schimba status
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
