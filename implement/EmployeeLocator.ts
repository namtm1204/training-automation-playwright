import { InputLocator } from "../locator/InputLocator";
import { LabelLocator } from "../locator/RadioInputLocator";
import { SelectionLocator } from "../locator/SelectionLocator";

export class EmployeeLocator {
  firstName: InputLocator;
  middleName: InputLocator;
  lastName: InputLocator;
  employeeId: InputLocator;
  otherId: InputLocator;
  driversLicenseNo: InputLocator;
  licenseExpiryDate: InputLocator;
  gender: LabelLocator;
  maritalStatus: SelectionLocator;
  nationality: SelectionLocator;
  dateOfBirth: InputLocator;
  addressStreet1: InputLocator;
  addressStreet2: InputLocator;
  city: InputLocator;
  stateProvince: InputLocator;
  zipPostalCode: InputLocator;
  country: SelectionLocator;
  homeTelephone: InputLocator;
  mobile: InputLocator;
  workTelephone: InputLocator;
  workEmail: InputLocator;
  otherEmail: InputLocator;
}
