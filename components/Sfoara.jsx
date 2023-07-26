import React from 'react';
import { ReactSVG } from 'react-svg';

export default function Sfoara(props){
    return(
        <div className={props.classes}>
            <ReactSVG src="/rope.svg" />
        </div>
    )
}