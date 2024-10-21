import { Pixel } from "../types";

// TODO: cleanup
// TODO: create element that allows for picking a color on initial color generation

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

function colorClosure() {
  //generate base color
  let baseHue = Math.floor(Math.random()) * 360;
  let generateScheme;

  //generate scheme from baseColor
  function deferrScheme() {
    const colors = [];

    // baseColor
    // contrasting color
    // accent color
  }

  function setBaseHue(inputHue: number) {
    if (inputHue >= 0 || inputHue <= 360) {
      baseHue = inputHue;
    }
  }

  return [deferrScheme(), setBaseHue];
}

function randomNumRanged(from: number, to: number) {
  return Math.floor(Math.random() * (to - from)) + from;
}

export function colorMixer() {
  return `hsl(${
    //hue
    possibilityGenerator("240", "248", "268", "254", "236")
  }, ${
    //saturation
    possibilityGenerator(
      randomNumRanged(30, 50).toString(),
      randomNumRanged(50, 65).toString(),
      randomNumRanged(25, 40).toString(),
      randomNumRanged(75, 90).toString(),
      randomNumRanged(92, 96).toString(),
    )
  }%, ${
    //lightness
    possibilityGenerator(
      randomNumRanged(20, 65).toString(),
      randomNumRanged(8, 20).toString(),
      randomNumRanged(40, 60).toString(),
      randomNumRanged(60, 70).toString(),
      randomNumRanged(75, 86).toString(),
    )
  }%)`;
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
        color: colorMixer(),
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

export function handleMovement(
  rowIndex: number,
  columnIndex: number,
  maxIndex: number,
  key: string,
) {
  switch (key) {
    case "w":
      return `${rowIndex}:${(columnIndex !== 0 ? columnIndex : maxIndex) - 1}`;
    case "a":
      return `${(rowIndex !== 0 ? rowIndex : maxIndex) - 1}:${columnIndex}`;
    case "s":
      return `${rowIndex}:${columnIndex !== maxIndex - 1 ? columnIndex + 1 : 0}`;
    case "d":
      return `${rowIndex !== maxIndex - 1 ? rowIndex + 1 : 0}:${columnIndex}`;
    default:
      return `${rowIndex}:${columnIndex}`;
  }
}

function possibilityGenerator(
  fivePointTwoFiveInTen: string,
  threeInTen: string,
  oneInTen: string,
  pointFiveInTen: string,
  pointTwoFiveInTen: string,
) {
  const outcomeDecider = Math.random();
  // highest probability will be returend most of the time
  // thus should have the shortest route
  if (outcomeDecider >= 0.475) {
    return fivePointTwoFiveInTen;
  }
  // subtract chance in percentage points
  // here read if random number is between 0.175 and 0.4749999
  if (outcomeDecider >= 0.175) {
    return threeInTen;
  }
  if (outcomeDecider >= 0.075) {
    return oneInTen;
  }
  if (outcomeDecider >= 0.025) {
    return pointFiveInTen;
  }
  // least likely return should be at the bottom since
  // it will happen the least number of times
  else {
    return pointTwoFiveInTen;
  }
}

export function handleColor(currentColor: string, keyPressed: string) {
  const curCol = currentColor;
  const [hue, saturation, lightness] = curCol
    .slice(4, -1)
    .split(", ")
    .map((str) => +str.replace("%", ""));

  const colorObj = {
    h: hue,
    s: saturation,
    l: lightness,
  };

  switch (keyPressed) {
    case "q": {
      colorObj.h = hue - 2;
      break;
    }
    case "Q": {
      colorObj.h = hue - 25;
      break;
    }
    case "e": {
      colorObj.h = hue - 2;
      break;
    }
    case "E": {
      colorObj.h = hue + 25;
      break;
    }
    case "K": {
      colorObj.l = lightness - 10;
      break;
    }
    case "k": {
      colorObj.l = lightness - 2;
      break;
    }
    case "O": {
      colorObj.l = lightness + 10;
      break;
    }
    case "o": {
      colorObj.l = lightness + 2;
      break;
    }
    case "P": {
      colorObj.s = saturation + 10;
      break;
    }
    case "p": {
      colorObj.s = saturation + 2;
      break;
    }
    case "L": {
      colorObj.s = saturation - 10;
      break;
    }
    case "l": {
      colorObj.s = saturation - 2;
      break;
    }

    default:
      break;
  }

  colorObj.h = circularLimiter(colorObj.h, 360);
  colorObj.l = circularLimiter(colorObj.l, 100);
  colorObj.s = circularLimiter(colorObj.s, 100);

  const stringColor = `hsl(${colorObj.h}, ${colorObj.s}%, ${colorObj.l}%)`;
  console.log(stringColor);
  return stringColor;
}

function circularLimiter(input: number, upperLimit: number) {
  return input > upperLimit || input < 0
    ? ((input % upperLimit) + upperLimit) % upperLimit
    : input;
}
