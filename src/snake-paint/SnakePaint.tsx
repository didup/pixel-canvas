import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
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
  const context = useContext(SnakePaintContext);
  const [row, column] = (context?.canvas?.selected || "0:0")
    .split(":")
    .map((el) => +el);
  const canvasSize = context?.canvas?.size ?? 0;

  // w => selectItems Row Value should be decreased by one
  //      except if it is at zero, in which case it should be set to
  //      the maximum which is canvasSize minus 1

  function handleMovement(
    rowIndex: number,
    columnIndex: number,
    maxIndex: number,
    direction: string,
  ) {
    switch (direction) {
      case "a":
        return `${(rowIndex !== 0 ? rowIndex : maxIndex) - 1}:${columnIndex}`;
      case "s":
        return `${rowIndex}:${columnIndex !== maxIndex - 1 ? columnIndex + 1 : 0}`;
      case "d":
        return `${rowIndex !== maxIndex - 1 ? rowIndex + 1 : maxIndex - 1}:${columnIndex}`;
      case "w":
        return `${rowIndex}:${(columnIndex !== 0 ? columnIndex : maxIndex) - 1}`;
      default:
        return "0:0";
    }
  }

  const handleEvent = useCallback(
    (e: KeyboardEvent) => {
      if (["w", "d", "s", "a"].some((el) => el === e.key.toLowerCase())) {
        context?.dispatchCanvas({
          type: "selectItem",
          itemId: handleMovement(
            row,
            column,
            canvasSize,
            e.key.toLocaleLowerCase(),
          ),
        });
      }
    },
    [context?.canvas.selected],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEvent);

    return () => {
      window.removeEventListener("keydown", handleEvent);
    };
  }, [handleEvent]);

  return (
    <div className="controls wasd">
      <div>
        <button className="btn" type="button">
          <kbd>D</kbd>
        </button>
      </div>
      <div>
        controller
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
              x={x}
              y={y}
              width={el.id === canvas.selected ? pixelSize - 8 : pixelSize}
              height={el.id === canvas.selected ? pixelSize - 8 : pixelSize}
              style={{ fill: el.color, opacity: el.opacity }}
              key={el.id}
              id={el.id}
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
