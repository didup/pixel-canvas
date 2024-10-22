import { useContext } from "react";
import { PaintContext } from "../contexts/PaintContext";
import { handleMovement, handleColor } from "../utils/utils";
import useKeyboard from "../hooks/useKeyboard";

const Controls = () => {
  const [moveKeys, editKeys] = useKeyboard();
  const { canvas, dispatchCanvas } = useContext(PaintContext);
  const [row, column] = (canvas?.selected || "0:0").split(":").map((el) => +el);
  const canvasSize = canvas?.size ?? 0;
  const currentColor = canvas?.pixels.filter(
    (el) => el.id === canvas.selected,
  )[0].color;

  return (
    <div className="controls-bar">
      <div>
        <div className="controls-cursor">
          {moveKeys.map((targetKey) => (
            <button
              className={`btn btn--${targetKey}`}
              key={`button-${targetKey}`}
              onClick={() =>
                dispatchCanvas({
                  type: "selectItem",
                  itemId: handleMovement(row, column, canvasSize, targetKey),
                })
              }
              type="button"
            >
              <kbd>{targetKey}</kbd>
            </button>
          ))}
        </div>
        <p>move cursor</p>
      </div>
      <div>
        <div className="controls-edit">
          {editKeys
            .filter((key) => key.match(/[a-z]/))
            .map((targetKey) => (
              <button
                className={`btn btn--${targetKey}`}
                key={`button-${targetKey}`}
                onClick={() =>
                  dispatchCanvas({
                    type: "setColor",
                    value: handleColor(currentColor, targetKey),
                  })
                }
                type="button"
              >
                <kbd>{targetKey}</kbd>
              </button>
            ))}
        </div>
        <p>move cursor</p>
      </div>
    </div>
  );
};

export default Controls;
