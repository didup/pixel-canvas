import { useReducer, ReactElement, Reducer } from "react";
import { Canvas, CanvasAction } from "../types";
import { CNV } from "../reducers/canvasReducer";
import { PaintContext } from "./PaintContext";

const PaintContextWrapper = ({ children }: { children: ReactElement }) => {
  const [canvas, dispatchCanvas] = useReducer<Reducer<Canvas, CanvasAction>>(
    CNV.reducer,
    CNV.init,
  );

  return (
    <PaintContext.Provider value={{ canvas, dispatchCanvas }}>
      {children}
    </PaintContext.Provider>
  );
};

export default PaintContextWrapper;
