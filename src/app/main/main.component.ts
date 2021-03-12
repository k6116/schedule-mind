import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiDataService } from '../_shared/services/api-data.service';

interface ShiftDetails {
  shift: string | null;
  day: number | null;
  employeeId: number | null;
}

interface ShiftDetailsPivoted {
  days: ShiftDetails[];
  employeeId: number;
  name: string | undefined;
}

interface PythonData {
  data: ShiftDetails[];
  statistics: any;
}

interface ShiftsRequirements {
  morning: number;
  afternoon: number;
  night: number;
}

interface Schedule {
  employeeId: number;
  name: string;
  days: any;
}

interface User {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  employees = [
    { id: 0, name: 'Nick'},
    { id: 1, name: 'Jane'},
    { id: 2, name: 'Zoey'},
    { id: 3, name: 'Christopher'},
    { id: 4, name: 'Montana'},
    { id: 5, name: 'Juniper'},
    { id: 6, name: 'Flanigan'},
  ];

  daysOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  shifts = ['M', 'A', 'N'];

  form = this.fb.group({
    numOfEmployees: [''],
    numOfWeeks: [''],
    shiftRequirements: this.fb.array([])
  });

  users: User[] | undefined;
  // schedulesData: PythonData | undefined;
  schedulesData: any;

  constructor(
    private fb: FormBuilder,
    private apiDataService: ApiDataService
  ) { }

  ngOnInit(): void {

    const shiftRequirementsFormArray = this.form.get('shiftRequirements') as FormArray;
    this.daysOfWeeks.forEach(d => {
      const tempFG = this.fb.group({
        morning: 1,
        afternoon: 1,
        night: 1
      });
      shiftRequirementsFormArray.push(tempFG);
    });

    console.log(`form`, this.form);

    this.apiDataService.getUserList().subscribe(
      res => {
        this.users = res;
      },
      err => {
        console.error('err', err);
      }
    );

  }

  // createArrayByEmployees = (numOfEmployees: number) => Array(numOfEmployees).fill().map((_, i) => i * i); // need ES6

  createArrayByEmployees = (numOfEmployees: number) => {
    const data: ShiftDetailsPivoted[] = [];
    for (let i = 0; i < numOfEmployees; i++) {
      data.push({
        employeeId: i,
        name: this.employees.find(n => n.id === i)?.name,
        days: []
      });
    }
    return data;
  }

  reformatScheduleData = (scheduleData: ShiftDetails[], numOfWeeks: number) => {
    const emps = this.createArrayByEmployees(7);
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

  // convertShiftReqsToPythonTuples = (shiftRequirements: ShiftsRequirements[]) => {
  //   const newArr = [];
  //   shiftRequirements.forEach(sr => {
  //     newArr.push([Number(sr.morning), Number(sr.afternoon), Number(sr.night)]);
  //   });
  //   return newArr;
  // }

  convertShiftReqsToPythonTuples = (shiftRequirements: ShiftsRequirements[]) =>
    shiftRequirements.map(sr => ([Number(sr.morning), Number(sr.afternoon), Number(sr.night)]))

  test(): void {

    const rawValue = this.form.getRawValue();

    rawValue.shiftRequirements = this.convertShiftReqsToPythonTuples(rawValue.shiftRequirements);
    console.log('rawValue', rawValue);

    this.apiDataService.runPythonScheduler(rawValue).subscribe(
      res => {
        console.log('python response', res);
        const jsonResult = JSON.parse(res);
        console.log('data', jsonResult.data);
        // this.schedulesData = jsonResult.data;
        this.schedulesData = this.reformatScheduleData(jsonResult.data, rawValue.numOfWeeks);
        console.log('data', this.schedulesData);
      },
      err => {
        console.error('runPython err', err);
      }
    );

  }

}
