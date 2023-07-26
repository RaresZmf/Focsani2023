import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useUser } from "@auth0/nextjs-auth0/client";
import supabase from '@/utils/supabase';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { user, isLoading } = useUser();
  console.log(user);


  async function fetchUser() {
    const { data, error } = await supabase
      .from("userdata")
      .select("*")
      .eq("auth0id", user.sub)
      .limit(1);

    console.log(data);
    console.log(error);

    if (data.length < 1) {
      await supabase.from("userdata").insert({ auth0id: user.sub });

      console.log("added user");
    } else {
      console.log("user already exists");
    }
  }

  if (user)
    fetchUser()

  return (
    <main className='flex flex-col items-center'>
      <div className='flex flex-col gap-10 items-center'>
        <h1 className='text-8xl font-bold text-gray-700 mt-[30vh] text-center'>Stapaneste <span className='bg-clip-text text-transparent bg-gradient-to-r from-lime-500 to-lime-300'>Nodurile</span>.</h1>
      </div>
      <div className='text-gray-500 text-xl text-center py-[20px]'>
        <p>Descoperă arta nodurilor! Învață
          <br />să legi noduri într-un mod simplu și captivant.</p>
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
