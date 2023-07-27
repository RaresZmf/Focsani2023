import React from 'react'
import Image from 'next/image'

export default function why() {
  return (
    <main className='flex flex-col items-center text-gray-700'>
      <div className='flex flex-col gap-10 items-center'>
        <h1 className='text-6xl font-bold text-gray-700 mt-[20vh] text-center'>Proiect facut in 24h<br/> pentru concursul infoeducatie</h1>
      </div>
      <div className='flex flex-row items-center space-x-96 justify-between'>
        <Image className='mr-[200px]' src={'https://res.cloudinary.com/dha7yg3ul/image/upload/v1690400723/Tent_amc4t4.png'} width={300} height={300} />
        <div className='w-[250px] h-[250px] relative'>
          <Image className='' src={'https://res.cloudinary.com/dha7yg3ul/image/upload/v1690400727/Rope_fxidki.png'} fill={true} />
        </div>
      </div>
    </main>
  )
}
