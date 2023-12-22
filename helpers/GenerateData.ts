export class GenerateData {
  generateRandomEmployeeData(listEmployee: any[]) {
    let uniqueRawFirstName = new Map();
    let newListEmployee = new Array();

    for (let i = 0; i < listEmployee.length; i++) {
      if (uniqueRawFirstName.has(listEmployee[i].first_name)) {
        newListEmployee.push(
          newListEmployee[uniqueRawFirstName.get(listEmployee[i].first_name)]
        );
      } else {
        uniqueRawFirstName.set(listEmployee[i].first_name, i);
        let randomNumber = Math.floor(Math.random() * 100);

        listEmployee[i].first_name =
          listEmployee[i].first_name + "_" + new Date().getTime();
        if (listEmployee[i].employee_id != "") {
          listEmployee[i].employee_id =
            listEmployee[i].employee_id + "_" + randomNumber;
        }
        if (listEmployee[i].other_id != "") {
          listEmployee[i].other_id =
            listEmployee[i].other_id + "_" + randomNumber;
        }
        if (listEmployee[i][`driver's_license_no`] != "") {
          listEmployee[i][`driver's_license_no`] =
            listEmployee[i][`driver's_license_no`] + randomNumber;
        }
        if (listEmployee[i].home_telephone != "") {
          listEmployee[i].home_telephone =
            listEmployee[i].home_telephone + randomNumber;
        }
        if (listEmployee[i].mobile != "") {
          listEmployee[i].mobile = listEmployee[i].mobile + randomNumber;
        }
        if (listEmployee[i].work_telephone != "") {
          listEmployee[i].work_telephone =
            listEmployee[i].work_telephone + randomNumber;
        }
        if (listEmployee[i].work_email != "") {
          listEmployee[i].work_email =
            randomNumber + listEmployee[i].work_email;
        }
        if (listEmployee[i].other_email != "") {
          listEmployee[i].other_email =
            randomNumber + listEmployee[i].other_email;
        }
        newListEmployee.push(listEmployee[i]);
      }
    }
    return newListEmployee;
  }
}
