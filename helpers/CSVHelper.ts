import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";
import { Employee } from "../implement/Employee";
import ObjectsToCsv from "objects-to-csv";

export class CSVHelper {
  constructor() {}

  parseToJson(dirName: string) {
    const records = parse(fs.readFileSync(path.join(dirName)), {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  }
  parseToEmployee(dirName: string): Employee[] {
    const records = parse(fs.readFileSync(path.join(dirName)), {
      columns: (header) =>
        header.map((column) => this.toConventionString(column)),
      skip_empty_lines: true,
    });
    return records;
  }

  toConventionString(key: string) {
    let regex = /[&\/\\#,_+()$~%.'":*?<>{}]/g;

    for (let i = 0; i < key.length - 1; i++) {
      if (key[i] === "_" || key[i] === "/") {
        key =
          key.substring(0, i) +
          key.substring(i + 1, i + 2).toUpperCase() +
          key.substring(i + 2);
      }
    }

    return key.replace(regex, "");
  }
  async createRandomTestDataFile(fileName: string, randomFileName: string) {
    let listEmployee = this.parseToJson(fileName);

    let newListEmployee = listEmployee.map((item) => {
      item.first_name = item.first_name + "_" + new Date().getTime();
      return item;
    });
    const csv = new ObjectsToCsv(newListEmployee);
    // create and write to file:
    fs.open(randomFileName, "w", function (err, file) {
      if (err) throw err;
      console.log("Saved!");
    });
    await csv.toDisk(randomFileName);
  }

  async deleteRandomTestDataFile(randomFileName: string) {
    fs.unlink(randomFileName, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  }
}
