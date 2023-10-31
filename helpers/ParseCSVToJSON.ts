import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export class ParseCSVToJSON {
  readonly dirName: string;
  constructor(dirName: string) {
    this.dirName = dirName;
  }
  parse() {
    const records = parse(fs.readFileSync(path.join(this.dirName)), {
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
}
