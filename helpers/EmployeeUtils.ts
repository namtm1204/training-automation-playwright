import { Employee } from "../implement/Employee";

export class EmployeeUtils {
  filterEmployeeList(listEmployeeData: Employee[]) {
    let uniqueData = new Array();
    let duplicatedData = new Array();
    let duplicatedDataIndex = new Array();
    let uniqueFirstName = new Array();
    for (let i = 0; i < listEmployeeData.length; i++) {
      if (uniqueFirstName.indexOf(listEmployeeData[i].firstName) == -1) {
        uniqueData.push(listEmployeeData[i]);
        uniqueFirstName.push(listEmployeeData[i].firstName);
      } else {
        duplicatedData.push(listEmployeeData[i]);
        duplicatedDataIndex.push(i + 2);
      }
    }
    return {
      uniqueData: uniqueData,
      duplicatedData: duplicatedData,
      duplicatedDataIndex: duplicatedDataIndex,
    };
  }
}
