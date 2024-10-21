import { createContext, Dispatch } from "react";
import { Canvas, CanvasAction } from "../types";

export const PaintContext = createContext<{
  canvas: Canvas;
  dispatchCanvas: Dispatch<CanvasAction>;
}>({
  canvas: {
    selected: "0:0",
    pixels: [],
    size: 0,
  },
  dispatchCanvas: () => {},
});
