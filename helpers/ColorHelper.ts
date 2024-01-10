export class ColorHelper {
  constructor() {}

  convertHexToRGB(hexColor: string) {
    hexColor = hexColor.replace(/^#/, "");

    const red = parseInt(hexColor.substring(0, 2), 16);
    const green = parseInt(hexColor.substring(2, 4), 16);
    const blue = parseInt(hexColor.substring(4, 6), 16);

    return {
      red: red,
      green: green,
      blue: blue,
    };
  }
}
