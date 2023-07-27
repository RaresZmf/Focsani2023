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
                .eq('archive', true )
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
            <span className='py-[20px] font-bold text-8xl bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-lime-200'>
                Mesaje arhivate
            </span>
            <div className='flex flex-col rounded-xl w-full sm:px-[0%] px-[8%]'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                    {articles.map((item) => (
                        <div className='' key={'ROBOZONE_COMMUNITY_POST_X_' + item.id} onClick={() => routers.push('./' + item.id)}>
                            <Postcard title={item.title} email={item.email} priority={item.priority} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
