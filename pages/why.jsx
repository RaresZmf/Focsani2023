import React from 'react'
import Image from 'next/image'

export default function why() {
  return (
    <main className='flex flex-col items-center text-gray-700'>
      <div className='flex flex-col gap-10 items-center'>
        <h1 className='text-6xl font-bold text-gray-700 mt-[10vh] text-center'>De ce ar fi o abilitate utilă <br /> să înveți cum să faci noduri?</h1>
      </div>
      <div className='flex flex-row items-center space-x-96 justify-between'>
        <Image className='mr-[200px]' src={'https://res.cloudinary.com/dha7yg3ul/image/upload/v1690400723/Tent_amc4t4.png'} width={300} height={300} />
        <div className='w-[250px] h-[250px] relative'>
          <Image className='' src={'https://res.cloudinary.com/dha7yg3ul/image/upload/v1690400727/Rope_fxidki.png'} fill={true} />
        </div>
      </div>
      <div className='w-[1000px] text-xl pb-[60px]'>
        <span className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300'>Abilități practice: </span> <br />
        <div className='pt-[20px]'>În multe situații, de la camping și drumeții, până la navigație și pescuit, abilitatea de a lega un nod sigur și fiabil poate fi extrem de utilă. Nodurile pot fi folosite pentru a asigura echipament, a construi adăposturi, a prinde pește și multe altele.</div>
      </div>
      <div className='w-[1000px] text-xl pb-[60px]'>
        <span className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300'>Siguranță: </span> <br />
        <div className='pt-[20px]'>Cunoașterea nodurilor corecte și a momentului potrivit de a le folosi poate fi esențială pentru siguranță. De exemplu, în alpinism, alegerea nodului corect și legarea lui corespunzătoare poate face diferența între viață și moarte.</div>
      </div>
      <div className='w-[1000px] text-xl pb-[60px]'>
        <span className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300'>Educație și dezvoltare cognitivă: </span> <br />
        <div className='pt-[20px]'>Procesul de învățare a nodurilor poate contribui la dezvoltarea abilităților motorii fine, îmbunătățirea coordonării mâini-ochi și stimularea gândirii spațiale și logice.</div>
      </div>
      <div className='w-[1000px] text-xl pb-[60px]'>
        <span className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300'>Valorizare culturală și istorică: </span> <br />
        <div className='pt-[20px]'>Nodurile au jucat un rol important în multe culturi și civilizații de-a lungul istoriei, de la navigația antică până la artizanat și artă. A învăța despre noduri poate oferi o apreciere mai profundă a acestei istorii și a modului în care abilitățile practice s-au transmis de la o generație la alta.</div>
      </div>
      <div className='w-[1000px] text-xl pb-[60px]'>
        <span className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300'>Satisfacție personală și hobby: </span> <br />
        <div className='pt-[20px]'>Pentru unii, legarea nodurilor poate fi o activitate relaxantă, asemănătoare cu rezolvarea unui puzzle. Există o anumită satisfacție în a învăța, a practica și a stăpâni diferite tipuri de noduri.</div>
      </div>
    </main>
  )
}
