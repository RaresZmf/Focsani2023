import NavButton from "./NavButton"
import Image from "next/image"
import Link from "next/link"

export default function NavBar(){
    return(
        <>
            <div className="flex flex-col justify-center items-center bg-lime-500 items-left space-y-10 fixed left-0 text-white w-[140px] h-full">
                <div className="w-[90%] te-neutral-100 h-full flex flex-col items-center">
                    <Link href='/' className="h-[100px]">
                        <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690401034/logoAlb_x7a8bc.png"} className="mb-[20px]" width={100} height={100}></Image>
                    </Link>
                    <div className="text-3xl text-center font-bold group relative group">
                        Noduri
                        <div className="invisible group-hover:visible absolute left-[140px] top-0">
                            <div>
                                djwakld
                            </div>
                            <div>
                                djwakld
                            </div>
                            <div>
                                djwakld
                            </div>
                            <div>
                                djwakld
                            </div>
                            <div>
                                djwakld
                            </div>
                            <div>
                                djwakld
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        
        </>
    )
}