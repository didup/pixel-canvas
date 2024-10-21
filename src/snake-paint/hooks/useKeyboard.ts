import { useEffect, useCallback, useContext } from "react";
import { PaintContext } from "../contexts/PaintContext";
import { handleMovement, handleColor } from "../utils/utils";

const MOVE_OPTIONS = ["w", "a", "s", "d"];
const EDIT_OPTIONS = [
  "q",
  "Q",
  "e",
  "E",
  "k",
  "K",
  "o",
  "O",
  "P",
  "p",
  "l",
  "L",
];

const useKeyboard = () => {
  // Needs to be used inside Context Wrapper
  const { canvas, dispatchCanvas } = useContext(PaintContext);

  // derived from canvas collected state
  const [row, column] = (canvas?.selected || "0:0").split(":").map((el) => +el);
  const canvasSize = canvas?.size ?? 0;
  const currentColor = canvas?.pixels.filter(
    (el) => el.id === canvas.selected,
  )[0].color;

  const handleKeys = useCallback(
    (e: KeyboardEvent) => {
      if (MOVE_OPTIONS.some((key) => key === e.key.toLowerCase())) {
        dispatchCanvas({
          type: "selectItem",
          itemId: handleMovement(
            row,
            column,
            canvasSize,
            e.key.toLocaleLowerCase(),
          ),
        });
      }
      if (EDIT_OPTIONS.some((key) => key === e.key)) {
        dispatchCanvas({
          type: "setColor",
          value: handleColor(currentColor, e.key),
        });
      }
    },

    [canvasSize, row, column, currentColor, dispatchCanvas],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, [handleKeys]);

  return [MOVE_OPTIONS, EDIT_OPTIONS];
};

export default useKeyboard;
