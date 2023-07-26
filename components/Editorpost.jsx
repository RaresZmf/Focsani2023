
import React from "react";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

// tools
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";

import Undo from 'editorjs-undo';
import DragDrop from 'editorjs-drag-drop';


import { useRouter } from "next/router";

export default function Editor({ read, title, json, note, user, actual_user, owner }) {
    const editorRef = useRef(null);
    const [editorData, setEditorData] = useState(null);
    const [fetchedContent, setfetchedContent] = useState(null)
    const router= useRouter()
    function get_url_extension(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }
    useEffect(() => {
        const exitingFunction = () => {
            editorRef.current.destroy();
            console.log('destronying editor')
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
                new Undo({ editor });
                new DragDrop(editor);
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
        const outputData = await editorRef.current.save();
        const rawResponse = await fetch('/api/notes/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: note,
                content: outputData.blocks,
            })
        });
        const cttt = await rawResponse.json();
        console.log(cttt);
        for (let i = 0; i < outputData.blocks.length; i++) {
            if (
                outputData.blocks[i].type === "header" &&
                outputData.blocks[i].data.level === 2
            ) {
                var title = outputData.blocks[i].data.text;
                break;
            }
        }
    };
    useEffect(() => {
        if (!editorRef.current) {
            if (window !== 'undefined') {
                initEditor(json)
            }
            // fetchContent(note).then((response) => { initEditor(response.json) })
        } else editorRef.current.destroy();

    }, []);




    return (
        <div className="flex flex-col items-center content-center justify-center">
            <div id="editorjs_post" className=" pt-10 z-0 rounded-lg bg-pink-100 text-pink-400  w-[1000px] color-[#37352f]" />
        </div>
    );
}