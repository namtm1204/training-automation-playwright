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
    let newListEmployee = this.generateRandomData(listEmployee);

    const csv = new ObjectsToCsv(newListEmployee);
    // create and write to file:
    fs.open(randomFileName, "w", function (err, file) {
      if (err) throw err;
      console.log("Saved!");
    });
    await csv.toDisk(randomFileName);
  }

  deleteRandomTestDataFile(randomFileName: string) {
    fs.unlink(randomFileName, function (err) {
      if (err) throw err;
      console.log("File deleted!");
    });
  }

  generateRandomData(listEmployee: any) {
    let uniqueRawFirstName = new Map();
    let newListEmployee = new Array();

    for (let i = 0; i < listEmployee.length; i++) {
      if (uniqueRawFirstName.has(listEmployee[i].first_name)) {
        newListEmployee.push(
          newListEmployee[uniqueRawFirstName.get(listEmployee[i].first_name)]
        );
      } else {
        let item = { ...listEmployee[i] };
        item.first_name = item.first_name + "_" + new Date().getTime();
        if (item.employee_id != "") {
          item.employee_id =
            item.employee_id + "_" + Math.floor(Math.random() * 100);
        }
        if (item.other_id != "") {
          item.other_id = item.other_id + "_" + Math.floor(Math.random() * 100);
        }
        if (item[`driver's_license_no`] != "") {
          item[`driver's_license_no`] =
            item[`driver's_license_no`] + Math.floor(Math.random() * 100);
        }
        if (item.home_telephone != "") {
          item.home_telephone =
            item.home_telephone + Math.floor(Math.random() * 100);
        }
        if (item.mobile != "") {
          item.mobile = item.mobile + Math.floor(Math.random() * 100);
        }
        if (item.work_telephone != "") {
          item.work_telephone =
            item.work_telephone + Math.floor(Math.random() * 100);
        }
        if (item.work_email != "") {
          item.work_email = Math.floor(Math.random() * 100) + item.work_email;
        }
        if (item.other_email != "") {
          item.other_email = Math.floor(Math.random() * 100) + item.other_email;
        }
        newListEmployee.push(item);
        uniqueRawFirstName.set(listEmployee[i].first_name, i);
        console.log(listEmployee[i].first_name);
      }
    }
    return newListEmployee;
  }
}
