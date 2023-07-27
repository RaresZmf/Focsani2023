import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";

export default function Postcard({
    email,
    admin,
}) {

    const maxLength = 40;
    const router = useRouter();

    return (
        <div
            className="flex flex-col sm:w-[1000px] text-gray-700 bg-white hover:-translate-y-[10px] cursor-pointer hover:shadow-md space-y-3 transition duration-300 ease-in-out border justify-between rounded-xl p-5 shadow "
        >
            <div className="flex flex-row w-full justify-between items-center content-center">
                <span className="underline decoration-4 text-left decoration-lime-500 font-bold text-lg">
                    {email}
                </span>
            </div>
            <span className="flex flex-row justify-between text-xs text-black text-opacity-40">
                <div className="rounded-full flex flex-row items-center content-center ">
                    <span className="text-gray-500 px-1 text-xl">
                        {admin ? 'Administrator' : 'Utilizator' }
                    </span>
                </div>
            </span>
        </div >
    );
}