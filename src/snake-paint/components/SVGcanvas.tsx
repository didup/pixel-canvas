import { Canvas } from "../types";
import { getPixelPos } from "../utils/utils";

const SVGcanvas = ({
  canvasData,
  qubicDimensions,
}: {
  canvasData: Canvas;
  qubicDimensions: number;
}) => {
  const canvasDimensions = qubicDimensions;
  const pixelSize = canvasData?.size
    ? Math.floor(canvasDimensions / canvasData.size)
    : 0;

  return (
    <svg
      width="100%" //
      viewBox={`0 0 ${canvasDimensions} ${canvasDimensions}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {canvasData?.pixels.map((el) => {
        const [x, y] = getPixelPos({
          pixelSize,
          pixelId: el.id,
          selected: canvasData.selected,
        });

        return (
          <rect
            x={x}
            y={y}
            width={el.id === canvasData.selected ? pixelSize - 8 : pixelSize}
            height={el.id === canvasData.selected ? pixelSize - 8 : pixelSize}
            style={{
              fill: el.color,
              opacity: el.opacity,
              stroke: el.id === canvasData.selected ? "white" : "none",
            }}
            key={el.id}
            id={el.id}
          />
        );
      })}
    </svg>
  );
};

export default SVGcanvas;
