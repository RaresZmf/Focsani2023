import { useRouter } from "next/router";
import Postcard from "@/components/Admincard"
import { useEffect, useState } from 'react'
import supabase from '@/utils/supabase';
import Link from "next/link";


export default function Noduri(){
    const [articles, setarticles] = useState([])
    const [query, setQuery] = useState('')
    const routers= useRouter()
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setQuery(routers.query);
    }, [routers.query]);

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("Noduri")
                .select("*")
                .limit(100)
                .order("id", { ascending: false });
            if (error) {
                console.error(error);
                return null;
            }
            setarticles(data);
            console.log(data);

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    console.log("Util")
    console.log(query.categorie);
    const newArticles = articles.filter((item) => {
        return item.utilizare == query.utilizare || item.dificultate == query.dificultate || item.categorie == query.categorie;
    });
    return(
        <div>
            <div className="flex flex-row items-center space-x-6">
                <h1 className="text-black text-5xl my-[10vh]">Noduri filtrate dupa <span className=" font-bold">{query.categorie === undefined ?   query.utilizare == undefined ? "dificultate: " + query.dificultate  : "utilizare: " + query.utilizare : "tip: " + query.categorie }</span></h1>
                {(query.utilizare || query.categorie) &&
                <div className="relative">
                    <button onClick={function(){toggleDropdown()}} className="text-white bg-primary hover:bg-lime-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">
                        Sorteaza dupa dificultate:
                        <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    {/* Dropdown menu */}
                    {isOpen && (
                        <div class="z-10 absolute top-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                            <ul class="py-2 text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li className="px-10 py-2">
                                <button className="text-center" onClick={function sorteaza(){
                                    const newArticles = articles.sort((a, b) => {
                                        return !(a.dificultate.localeCompare(b.dificultate));
                                    });
                                    setarticles(newArticles);
                                    setIsOpen(false);
                                    console.log("jrkwlad");
                                }}
                                >Crescator</button>
                            </li>
                            <hr />
                            <li className="px-10 py-2">
                                <button className="text-center" onClick={function sorteaza(){
                                    const newArticles = articles.sort((a, b) => {
                                        return a.dificultate.localeCompare(b.dificultate);
                                    });
                                    setarticles(newArticles);
                                    setIsOpen(false);
                                    console.log("jrkwlad");
                                }}>Descrescator</button>
                            </li>
                            </ul>
                        </div>
                    )}
                </div>  
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {newArticles.map((item) => (
                    <div className='' key={'ROBOZONE_COMMUNITY_POST_X_' + item.id} onClick={() => routers.push('./noduri/edit/' + item.id)}>
                        <div className="">
                            <Postcard id={item.id} title={item.nume} likes={item.json? item.json.length : 0} time={item.created_at} util={item.utilizare} dif={item.dificultate}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}