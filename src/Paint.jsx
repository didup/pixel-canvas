import { createContext } from "react";
import { CNV } from "./snake-paint/canvasReducer";

const svgCanvasSize = 16;

const SnakePaintContext = createContext();

function SnakePaint() {
  const [canvas, dispatchCanvas] = useReducer(CNV.reducer, CNV.init);

  return (
    <SnakePaintContext.Provider value={{ canvas, dispatchCanvas }}>
      {props.children}
    </SnakePaintContext.Provider>
  );
}

function Controls() {
  return (
    <div>
      <button />
    </div>
  );
}

function Canvas() {
  <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg"></svg>;
}

export default SnakePaint;

SnakePaint.Controls = Controls;
SnakePaint.Canvas = Canvas;
