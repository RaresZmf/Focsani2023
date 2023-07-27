import { useRouter } from "next/router";
import Image from "next/image";
import moment from "moment";

export default function Postcard({
  title,
  id,
  likes,
  props,
}) {
  console.log(title)
  console.log(id)
  console.log(likes)
  const maxLength = 40;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/admin/noduri/edit/" + id)}
      className={"flex flex-col text-gray-700 h-[200px] text-center align-center justify-center bg-white hover:-translate-y-[10px] cursor-pointer hover:shadow-md space-y-3 transition duration-300 ease-in-out border rounded-xl p-5 shadow"}
    >
      <div className="flex flex-row w-full justify-center items-center content-center">
        <span className="underline decoration-4 text-left decoration-lime-500 font-bold text-lg">
          {title}
        </span>
      </div>
      <span className="flex flex-row justify-center text-xs text-black text-opacity-40">
        <div className="rounded-full flex flex-row items-center content-center ">
          <span className="text-gray-500 px-1 text-xs">
            {likes} aprecieri{" "}
          </span>
        </div>
      </span>
    </div >
  );
}