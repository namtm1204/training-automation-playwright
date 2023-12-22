import { Employee } from "../implement/Employee";

export interface CustomEmployee {
  uniqueData: Employee[];
  duplicatedData: Employee[];
  duplicatedDataIndex: number[];
}
