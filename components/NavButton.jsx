import Image from "next/image"

export default function NavButton(props){
    return(
        <>
            <div className=" w-[100px] h-[100px] flex items-center justify-center hover:bg-secondary bg-black transition-colors">
                <Image src="https://res.cloudinary.com/dha7yg3ul/image/upload/v1690393936/Hiking_Rope_vn83pv.png" width={50} height={50}></Image>
            </div>
        </>
    )
}