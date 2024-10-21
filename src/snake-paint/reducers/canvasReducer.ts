import { ReducerObj, Canvas, CanvasAction } from "../types";
import { Reducer } from "react";
import { makeNewCanvas } from "../utils/utils";

const initCanvas: Canvas = {
  size: 8,
  pixels: makeNewCanvas(8),
  selected: "0:0",
};

const ACTIONS = {
  INIT: "initCanvas",
  SELECT: "selectItem",
  TOGGLE_VIS: "toggleOpacity",
  COLOR: "setColor",
};

const canvasReducer: Reducer<Canvas, CanvasAction> = (state, action) => {
  let prev;

  if (state) {
    prev = { ...state };
  } else {
    prev = { ...initCanvas };
  }

  switch (action.type) {
    case "initCanvas": {
      prev.size = action.value;
      prev.pixels = makeNewCanvas(action.value);
      break;
    }
    case "selectItem": {
      prev.selected = action.itemId;
      break;
    }
    case "toggleOpacity": {
      const isOpaque = prev.pixels.some((el) => el.opacity === 1);
      prev.pixels = prev.pixels.map((el) => ({
        ...el,
        opacity: isOpaque ? 0.5 : 1,
      }));
      break;
    }
    case "setColor": {
      const item = prev.pixels.filter((el) => el.id === prev.selected)[0];
      item.color = action.value;
      const canvasWithout = prev.pixels.filter((el) => el.id !== prev.selected);
      prev.pixels = [...canvasWithout, item];
      break;
    }
    default:
      break;
  }

  return prev;
};

export const CNV: ReducerObj = {
  init: initCanvas,
  actions: ACTIONS,
  reducer: canvasReducer,
};
