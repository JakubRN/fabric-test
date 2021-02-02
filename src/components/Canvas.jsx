import React, { memo, useState, useEffect } from "react";
import styled from "styled-components";
import useCanvas from "./../hooks/useCanvas";
import { SketchPicker } from 'react-color';

const CanvasEl = styled.canvas`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
`;
const CanvasComponent = memo(({canvasRef}) => <CanvasEl ref={canvasRef} />);

const Canvas = () => {
    const [color, setColor] = useState('yellow');
    const [canvasRef, changeColor] = useCanvas();
    useEffect(() => {
        changeColor(color);
    },[color, changeColor])
    return <div>
            <CanvasComponent canvasRef={canvasRef} />
            <SketchPicker 
                color={color}
                onChangeComplete={(c)=>setColor(c.hex)}
            />
        </div>;
};

export default Canvas;