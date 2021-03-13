import { Injectable } from '@angular/core';
import { ShiftDetails, ShiftDetailsPivoted, ShiftsRequirements, PythonData, Schedule, User, Employee } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class MainFacade {

  shifts = ['O', 'M', 'A', 'N'];

  constructor() { }

  createArrayByEmployees = (employees: Employee[]) => {
    const data = [];
    for (let i = 0; i < employees.length; i++) {
      data.push({
        employeeId: i,
        name: employees[i].name,
        days: []
      });
    }
    return data;
  }

  reformatScheduleData = (scheduleData: ShiftDetails[], numOfWeeks: number, employees: Employee[]) => {
    const emps = this.createArrayByEmployees(employees);
    emps.forEach(emp => {
      for (let i = 0; i < 7 * numOfWeeks; i++) {
        const found = scheduleData.find(obj => obj.day === i && obj.employeeId === emp.employeeId);
        if (found) {
          emp.days.push(found);
        } else {
          emp.days.push({shift: null, day: null, employeeId: null});
        }
      }
    });
    return emps;
  }

  convertShiftRequirements = (shiftRequirements: ShiftsRequirements[]) =>
    shiftRequirements.map(sr => ([Number(sr.morning), Number(sr.afternoon), Number(sr.night)]))

  convertEmployeeRequests = (employees: Employee[]) => {
    const reqs = [];
    employees.forEach((e, i) => {
      if (e.shift) {
        reqs.push(([i, this.shifts.indexOf(e.shift), Number(e.day), Number(e.weight)]));
      }
    });
    return reqs;
  }

}
