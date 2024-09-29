import { Pixel } from "./types";

// const pixel = {
//   id: "1:1",
//   color: "hsl(50, 50%, 100%)",
//   opacity: 1,
// };

/*
  hsl(hue (0-360), saturation (%), lightness(%))

  hue
      0   |- red
          |
    120   |- green
          |
    240   |- blue
          |
    360   |- red

*/

function rndHue5050() {
  return `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`;
}

class ColorGenerator {
  hue;
  constructor() {
    this.hue = Math.floor(Math.random() * 360) + 1;
  }

  shiftHue = function (this: ColorGenerator) {
    this.hue += Math.floor(Math.random() * 25) + 1;
    if (this.hue > 360) this.hue -= 360;
  };

  make = function mk(this: ColorGenerator) {
    return `hsl(${this.hue}, ${Math.floor(Math.random() * 80) + 1}%, ${Math.floor(Math.random() * 50) + 1}%)`;
  };
}

export const makeNewCanvas = (num: number): Pixel[] => {
  const maxSize = 12;
  let pixelSize;
  if (num > maxSize) {
    console.log("Set to max size of 64 x 64");
    pixelSize = maxSize;
  } else {
    pixelSize = num;
  }

  const inner = new ColorGenerator();

  const canvas = [];

  for (let rowIndex = 0; rowIndex < pixelSize; rowIndex++) {
    for (let columnIndex = 0; columnIndex < pixelSize; columnIndex++) {
      inner.shiftHue();
      canvas.push({
        id: `${rowIndex}:${columnIndex}`,
        color: inner.make(),
        opacity: 1,
      });
    }
  }

  return canvas;
};

export const getPixelPos = ({
  pixelId,
  pixelSize,
  selected,
}: {
  pixelId: string;
  pixelSize: number;
  selected: string;
}) => {
  const coords = pixelId.split(":").map((str) => +str);
  const x = getNewCoord(coords[0], pixelSize);
  const y = getNewCoord(coords[1], pixelSize);

  function getNewCoord(oldCoord: number, size: number) {
    if (selected !== pixelId) return Math.floor(oldCoord * size);

    return Math.floor(oldCoord * size) + 4;
  }

  return [x, y];
};
