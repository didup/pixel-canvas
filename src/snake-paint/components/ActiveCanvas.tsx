import { useContext } from "react";
import SVGcanvas from "./SVGcanvas";
import { PaintContext } from "../contexts/PaintContext";

const ActiveCanvas = () => {
  const { canvas } = useContext(PaintContext);

  return (
    <div className="canvas-container">
      <SVGcanvas canvasData={canvas} qubicDimensions={500} />
    </div>
  );
};

export default ActiveCanvas;
