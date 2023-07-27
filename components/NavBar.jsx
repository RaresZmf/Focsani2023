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
                    <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690447317/photo_2023-07-27_11-38-35_vur8vu.png"} width={60} height={60}></Image>
                    <div className="invisible group-hover:visible rounded-xl absolute pl-[140px] top-0 space-y-3">
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{utilizare:"pescuit"}}}>Pentru Pescuit</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{utilizare:"incaltaminte"}}}>Pentru Incaltaminte</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{utilizare:"cravata"}}}>Pentru Cravata</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{utilizare:"rezistenta"}}}>Pentru Rezistenta</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{utilizare:"altele"}}}>Altele</Link></div>
                    </div>
                </div>
                <div className="text-3xl text-center font-bold group relative">
                    <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690446786/acceleratiealb_ihey6i.png"} width={60} height={60}></Image>
                    <div className="invisible group-hover:visible rounded-xl absolute pl-[140px] space-y-3 top-0">
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{dificultate:"usor"}}}>Usor</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{dificultate:"mediu"}}}>Mediu</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{dificultate:"greu"}}}>Greu</Link></div>
                        <div className="text-black hover:bg-primary hover:text-white px-3 py-2 transition-colors rounded-xl"><Link href={{pathname:"../nod", query:{dificultate:"expert"}}}>Expert</Link></div>
                    </div>
                </div>
                <div>
                    <Link href='../admin' className="text-3xl text-center font-bold group relative">
                        <Image src={"https://res.cloudinary.com/dha7yg3ul/image/upload/v1690447164/photo_2023-07-27_11-36-50_zbnejs.png"} width={60} height={60}></Image>
                    </Link>
                </div>
            </div>
        
        </>
    )
}