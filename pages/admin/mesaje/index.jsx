import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import supabase from '@/utils/supabase';
import Postcard from "@/components/MsgCard"
export default function () {
    const [articles, setarticles] = useState([])
    const routers = useRouter()

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("msg")
                .select("*")
                .eq('archive', false)
                .limit(100)
                .order("created_at", { ascending: true });
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
        <div className='flex flex-col gap-10 w-[1000px] mt-[200px]'>
            <div className='flex flex-row justify-between align-center items-center'>
                <span className='py-[20px] font-bold text-8xl bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-lime-200'>
                    Mesaje
                </span>
                <button
                    onClick={function () { routers.push('/admin/mesaje/arhivate') }}
                    className="w-[150px] h-[50px] px-4 py-2 rounded-xl bg-lime-500 ring-2 ring-offset-2 ring-lime-500 transition duration-300 ease-in-out hover:ring-offset-4 text-white font-medium outline-2">
                    Vezi arhiva
                </button>
            </div>
            <div className='flex flex-col rounded-xl w-full sm:px-[0%] px-[8%]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                    {articles.map((item) => (
                        <div className='' key={'ROBOZONE_COMMUNITY_POST_X_' + item.id} onClick={() => routers.push('./mesaje/' + item.id)}>
                            <Postcard title={item.title} email={item.email} priority={item.priority} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
