import React from 'react'
import { useRouter } from "next/router";

export default function () {
    const routers = useRouter()
    
    return (
    <div>
        <button
            onClick={() => routers.push("./noduri/add")}
            className="w-[150px] px-4 py-2 rounded-xl bg-lime-500 ring-2 ring-offset-2 ring-lime-500 mt-6 transition duration-300 ease-in-out hover:ring-offset-4 text-white font-medium outline-2">
            Adauga un nod
          </button>
    </div>
  )
}
