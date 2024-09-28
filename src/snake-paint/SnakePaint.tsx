import React, {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  Dispatch,
  Reducer,
} from "react";
import { CNV } from "./canvasReducer";
import { Canvas, CanvasAction } from "./types";

const SnakePaintContext = createContext<{
  canvas: Canvas;
  dispatchCanvas: Dispatch<CanvasAction>;
} | null>(null);

function SnakePaint({ children }: { children: ReactElement }) {
  const [canvas, dispatchCanvas] = useReducer<Reducer<Canvas, CanvasAction>>(
    CNV.reducer,
    CNV.init,
  );

  return (
    <SnakePaintContext.Provider value={{ canvas, dispatchCanvas }}>
      {children}
    </SnakePaintContext.Provider>
  );
}

function Controls() {
  return <div></div>;
}

function SVGCanvas() {
  const context = useContext(SnakePaintContext);
  const canvas = context?.canvas;
  const canvasDimensions = 500;
  const pixelSize = canvas?.size
    ? Math.floor(canvasDimensions / canvas.size)
    : 0;

  return (
    <div className="canvas-container">
      <svg
        height={500}
        width={500}
        viewBox={`0 0 ${canvasDimensions} ${canvasDimensions}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {canvas?.pixels.map((el) => (
          <rect
            x={Math.floor(+el.id.split(":")[0] * pixelSize)}
            y={Math.floor(+el.id.split(":")[1] * pixelSize)}
            key={el.id}
            width={pixelSize}
            height={pixelSize}
            style={{ fill: el.color, opacity: el.opacity }}
          />
        ))}
      </svg>
    </div>
  );
}

export default SnakePaint;

SnakePaint.Controls = Controls;
SnakePaint.Canvas = SVGCanvas;
