import fs from "fs";

export class FileHelper {
  constructor() {}

  async readFile(fileName: string): Promise<string> {
    console.log(fileName);
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, async (err, inputD) => {
        if (err) reject(err);
        resolve(inputD.toString());
      });
    });
  }
  deleteFile(fileName: string) {
    fs.unlink(fileName, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  }
}
