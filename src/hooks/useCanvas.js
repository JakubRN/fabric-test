import { useState, useEffect, useRef } from "react";
import createFabricCanvas from "./../studio/canvas";
import createFabricObject from "./../studio/object";

const useCanvas = () => {
    const ref = useRef();
    const [canvas] = useState(createFabricCanvas());

    useEffect(() => {
        canvas.initialize(ref.current, {
            width: window.innerWidth,
            height: window.innerHeight*0.7
        });

        const customObject = createFabricObject();
        canvas.add(customObject);

        canvas.renderAll();
    }, [canvas]);
    
    const changeColor = (color) => {
        canvas.getObjects()[0].setColor(color);
        canvas.requestRenderAll();
    }
    const setRef = node => {
        ref.current = node;
    }

    return [setRef, changeColor];
}

export default useCanvas;