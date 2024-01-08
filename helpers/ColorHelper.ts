export class ColorHelper {
  constructor() {}

  generateColor(oldColor: string): string {
    let result = "";
    while (1) {
      const newColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      if (newColor != oldColor) {
        result = newColor;
        break;
      }
    }
    return result;
  }

  convertHexToRGB(hexColor: string) {
    // Remove the '#' if it's included in the input
    hexColor = hexColor.replace(/^#/, "");

    // Parse the hex values into separate R, G, and B values
    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    // Return the RGB values in an object
    return {
      red: red,
      green: green,
      blue: blue,
    };
  }
}
