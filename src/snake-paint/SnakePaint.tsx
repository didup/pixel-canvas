import {
  createContext,
  useContext,
  useReducer,
  ReactElement,
  Dispatch,
  Reducer,
} from "react";
import { Canvas, CanvasAction } from "./types";
import { CNV } from "./canvasReducer";
import { getPixelPos } from "./utils";

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
  return (
    <div className="controls wasd">
      <div>
        <button className="btn" type="button">
          <kbd>D</kbd>
        </button>
      </div>
      <div>
        <button className="btn" type="button">
          <kbd>W</kbd>
        </button>

        <button className="btn" type="button">
          <kbd>A</kbd>
        </button>

        <button className="btn" type="button">
          <kbd>S</kbd>
        </button>
      </div>
    </div>
  );
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
        {canvas?.pixels.map((el) => {
          const [x, y] = getPixelPos({
            pixelSize,
            pixelId: el.id,
            selected: canvas.selected,
          });

          return (
            <rect
              id={el.id}
              x={x}
              y={y}
              key={el.id}
              width={el.id === canvas.selected ? pixelSize - 8 : pixelSize}
              height={el.id === canvas.selected ? pixelSize - 8 : pixelSize}
              style={{ fill: el.color, opacity: el.opacity }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default SnakePaint;

SnakePaint.Controls = Controls;
SnakePaint.Canvas = SVGCanvas;
