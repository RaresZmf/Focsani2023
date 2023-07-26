import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';

const SimplePage = () => {
    const editorJsRef = useRef(null);

    useEffect(() => {
        const editorJsInstance = new EditorJS({
            holder: 'editorjs',
            tools: {
                header: Header,
            },
            data: {},
        });
        editorJsRef.current = editorJsInstance;
        return () => {
            editorJsRef.current.destroy();
            editorJsRef.current = null;
        };
    }, []);

    return <div id="editorjs" />;
};

export default SimplePage;
