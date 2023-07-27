import React from "react";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

// tools
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import supabase from "@/utils/supabase";
import axios from "axios";

import { useRouter } from "next/router";

export default function Editor({id,title, json, utility, dif, categorie }) {
    const editorRef = useRef(null);
    const [editorData, setEditorData] = useState(null);
    const [fetchedContent, setfetchedContent] = useState(null)
    const [loading, setloading] = useState(true);
    const [titlu, settitlu] = useState(title)
    const [utilizare, setutilizare] = useState(utility)
    const [dificultate, setdificultate] = useState(dif)
    const [tip, setTip] = useState(categorie)

    console.log(titlu)
    console.log(utility)
    const router = useRouter()

    function get_url_extension(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }
    async function up(file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );
    
        try {
          const res = await axios.post(
            process.env.NEXT_PUBLIC_CLOUDINARY_URL,
            formData
          );
    
          console.log("res:");
          console.log(res);
          const data = await res;
          return res.data.secure_url;
        } catch (error) {
          console.error("Eroare la încărcarea imaginii:", error);
        }
      }

    useEffect(() => {
        const exitingFunction = () => {
          if(editorRef.current){
            editorRef.current.destroy();
            console.log('destronying editor')
          }
        };

        router.events.on("routeChangeStart", exitingFunction);

        return () => {
            console.log("unmounting component...");
            router.events.off("routeChangeStart", exitingFunction);
        };
    }, []);

    async function initEditor(cc) {
        const editor = new EditorJS({
            readOnly: false,
            holderId: "editorjs_post",
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ["marker", "link"],
                    config: {
                        placeholder: 'Enter a header',
                        levels: [1, 2, 3, 4, 5, 6],
                        defaultLevel: 3
                    },
                    shortcut: "CMD+SHIFT+H",
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                image: {
                    class: Image,
                    config: {
                      uploader: {
                        uploadByFile(file) {
                          console.log(file);
          
                          // your own uploading logic here
                          return up(file).then((response) => {
                            console.log(response);
                            return {
                              success: 1,
                              file: {
                                url: response,
                                // any other image data you want to store, such as width, height, color, extension, etc
                              },
                            };
                          });
                        },
                      },
                    },
                  },
            },
            // autofocus: true,
            placeholder: "Write your story...",
            data: {
                blocks: cc
            },
            onReady: () => {
                console.log("Editor.js is ready to work!");
                editorRef.current = editor;
                console.log(json)
                console.log(title)
                setloading(false)
            },
            onChange: () => {
                console.log("Content was changed");
                console.log(title);
            },
            onSave: () => {
                console.log("Content was saved");
            },
        });
    };

    const handleSave = async () => {
        setloading(true);
        const outputData = await editorRef.current.save();
        console.log(title);
        try {
            const { error } = await supabase
                .from('Noduri')
                .update({ 
                    nume: titlu ? titlu : title, 
                    categorie: categorie, 
                    dificultate: dificultate,
                    utilizare: utilizare,
                })
                .eq('id', id);
            console.log('se adauga')
            if (!error) { router.push('/admin') }
        } catch (error) {
            console.log(error);
        }
        console.log(outputData)
    };

    useEffect(() => {
        if (!editorRef.current) {
            if (window !== 'undefined') {
                initEditor(json)
            }
        } else editorRef.current.destroy();
    }, []);

    return (
        <div className="flex flex-col items-center content-center justify-center mt-[20vh]">
            <input disabled={loading} placeholder={title} onChange={(e) => settitlu(e.target.value)} className='text-gray-700 bg-transparent self-start w-full caret-blue-500 border-transparent focus:border-transparent focus:ring-0 text-5xl focus:outline-none' />
            <div id="editorjs_post" className=" pt-10 z-0 rounded-lg bg-gray-50 text-black max-w-[1000px] w-[90vw] color-[#37352f]" />
            <div className="flex flex-row justify-center items-start space-x-10 pt-4">
                <div className="text-3xl text-center font-bold group text-black relative">
                    <button className="text-black bg-white">{utilizare}</button>
                    <div className="invisible group-hover:visible relative flex flex-col left-[0px] top-4 pb-6 space-y-2">
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setutilizare('pescuit')}}>Pentru pescuit</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setutilizare('incaltaminte')}}>Pentru incaltaminte</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setutilizare('cravata')}}>Pentru cravata</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setutilizare('rezistenta')}}>Pentru rezistenta</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setutilizare('altele')}}>Altele</button>
                    </div>
                </div>
                <div className="text-3xl text-center font-bold group text-black relative">
                    <button className="text-black bg-white">{dificultate}</button>
                    <div className="invisible group-hover:visible relative flex flex-col left-[0px] top-4 pb-6 space-y-2">
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setdificultate('usor')}}>Usor</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setdificultate('mediu')}}>Mediu</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setdificultate('greu')}}>Greu</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setdificultate('expert')}}>Expert</button>
                    </div>
                </div>
                <div className="text-3xl text-center font-bold group text-black relative">
                    <button className="text-black bg-white">{categorie}</button>
                    <div className="invisible group-hover:visible relative flex flex-col left-[0px] top-4 pb-6 space-y-2">
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('de baza')}}>de baza</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('curbe')}}>curbe</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('bucle de capat')}}>bucle de capat</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('carlige')}}>carlige</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('covor')}}>covor</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('bucle mijlocii')}}>bucle mijlocii</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('alunecare si prindere')}}>alunecare si prindere</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('imbinare')}}>imbinare</button>
                        <button className="hover:bg-primary px-[10px] py-[5px] transition-colors rounded-xl" onClick={function(){setTip('dopuri')}}>dopuri</button>

                    </div>
                </div>
                <button disabled={loading} onClick={handleSave} className='w-full bg-black text-white h-[50px] rounded-xl font-bold'>
                    {!loading ? 'Trimite' : <div className="flex flex-row justify-center w-full items-center space-x-1 content-center">
                        <div className="p-1 rounded-full bg-white animate-pulse"></div><div className="p-1 rounded-full bg-white animate-pulse"></div><div className="p-1 rounded-full bg-white animate-pulse"></div>
                    </div>}
                </button>
            </div>
        </div>
    );
}