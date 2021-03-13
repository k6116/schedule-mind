
export interface ShiftDetails {
  shift: string;
  day: number;
  employeeId: number;
}

export interface ShiftDetailsPivoted {
  days: ShiftDetails[];
  employeeId: number;
  name: string;
}

export interface PythonData {
  data: ShiftDetails[];
  statistics: any;
}

export interface ShiftsRequirements {
  morning: number;
  afternoon: number;
  night: number;
}

export interface Schedule {
  employeeId: number;
  name: string;
  days: any;
}

export interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export interface Employee {
  name: string;
  shift: string;
  day: number;
  weight: number;
}
