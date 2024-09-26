const square = {
  id: "1:1",
  color: "hsl(50, 50, 100)",
  opacity: 1,
};

export const makeNewCanvas = (num) => {
  let squareSize;
  if (num > 32) {
    console.log("Set to max size of 64 x 64");
    squareSize = 32;
  } else {
    squareSize = num;
  }

  const canvas = [];

  for (let i = 0; i < squareSize; i++) {
    for (let j = 0; j < squareSize; j++) {
      canvas.push ({
        id: `${j}:${i}`,
        color: 'hsl(50, 50%, 50%)',
        opacity: 1,
      });
    }
  }

  return canvas;
};
