import NavButton from "./NavButton"
import Image from "next/image"
import Link from "next/link"
import Sfoara from "./Sfoara"

// hack mode activated
//bine boss
// hai sa le dam peste nas


export default function NavBar(){
    return(
        <>
            <div className="flex flex-col justify-start items-center space-y-10 bg-lime-500 items-left fixed left-0 text-white w-[140px] h-full">
                <Link href='/' className="h-[100px]">
                    <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690401034/logoAlb_x7a8bc.png"} className="mb-[20px]" width={100} height={100}></Image>
                </Link>
                <div className="text-3xl text-center font-bold group relative">
                    <Sfoara classes='text-center relative hover:bg-white'/>
                    <div className="invisible group-hover:visible absolute left-[140px] top-0">
                        {/* <LectiiHomePage/> */}
                    </div>
                </div>
            </div>
        
        </>
    )
}