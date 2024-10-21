export type Pixel = {
  id: string;
  color: string;
  opacity: number;
};

export type Canvas = {
  size: number;
  pixels: Pixel[];
  selected: string;
};

export type CanvasAction =
  | {
      type: "initCanvas";
      value: number;
    }
  | {
      type: "selectItem";
      itemId: string;
    }
  | {
      type: "toggleOpacity";
    }
  | {
      type: "setColor";
      value: string;
    };

export type ReducerObj = {
  init: Canvas;
  actions: Record<string, string>;
  reducer: (state: Canvas, action: CanvasAction) => Canvas;
};
