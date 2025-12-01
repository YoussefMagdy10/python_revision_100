import React, { useState, useRef, useEffect } from "react";
import "./Explanation.css";

// image: i, text: t, title: l
const Explanation = ({titles, texts, images, items}) => {
    let titleIdx = 0;
    let textIdx = 0;
    let imgIdx = 0;
    for(const item of items) {
        if(item === 'i') {
            const img = images[imgIdx];
            imgIdx++;
            // some code
            
        } else if(item === 'l') {
            const title = titles[titleIdx];
            titleIdx++;
            // some code

        } else if(item === 't') {
            const text = texts[textIdx];
            textIdx++;
            // some code
            
        } else {
            // pass
        }
    }
}

export default Explanation;