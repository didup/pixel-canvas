import { makeNewCanvas } from "./utils";

export const CNV = {};

const initCanvas = {
  size: 16,
  canvas: [],
  selected: "1:1",
};

const ACTIONS = {
  INIT: "initCanvas",
  SELECT: "selectItem",
  TOGGLE_VIS: "toggleOpacity",
  COLOR: "setColor",
};

function canvasReducer(state, action) {
  const prev = { ...state };

  switch (action.type) {
    case "initCanvas": {
      return {
        size: action.value,
        canvas: makeNewCanvas(action.value),
        selected: "1:1",
      };
    }
    case "selectItem": {
      prev.selected = action.value;
      return prev;
    }
    case "toggleOpacity": {
      const isOpaque = prev.canvas.some((el) => el.opacity === 1);
      prev.canvas = prev.canvas.map(
        (el = { ...el, opacity: isOpaque ? 0.5 : 1 }),
      );
      return prev;
    }
    case "setColor": {
      const item = prev.canvas.filter((el) => el.id === action.itemId);
      item.color = action.value;
      const canvasWithout = prev.canvas.filter((el) => el.id !== action.itemId);
      prev.canvas = [...canvasWithout, item];
      return prev;
    }
  }
}

CNV.init = initCanvas;
CNV.actions = ACTIONS;
CNV.reducer = canvasReducer;
