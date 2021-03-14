import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiDataService } from '../_shared/services/api-data.service';
import { ShiftDetails, ShiftDetailsPivoted, ShiftsRequirements, PythonData, Schedule, User } from './interfaces/interface';
import { MainFacade } from './services/main.facade';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeesComponent } from './modals/add-employees/add-employees.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  daysOfWeeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  form = this.fb.group({
    numOfWeeks: [1],
    shiftRequirements: this.fb.array([]),
    employees: this.fb.array([])
  });

  users: User[];
  schedulesData: any;

  constructor(
    private fb: FormBuilder,
    private apiDataService: ApiDataService,
    private facade: MainFacade,
    private modalService: NgbModal
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

    const employeesFormArray = this.form.get('employees') as FormArray;
    employeesFormArray.push(this.fb.group({
      name: 'paul',
      shift: null,
      day: null,
      weight: null
    }));

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

  submit(): void {

    const rawValue = this.form.getRawValue();

    rawValue.shiftRequirements = this.facade.convertShiftRequirements(rawValue.shiftRequirements);
    rawValue.employeeRequests = this.facade.convertEmployeeRequests(rawValue.employees);
    rawValue.numOfEmployees = rawValue.employees.length;

    console.log('rawValue', rawValue);
    this.apiDataService.runPythonScheduler(rawValue).subscribe(
      res => {
        console.log('python response test', res);
        const jsonResult = JSON.parse(res);
        // console.log('data', jsonResult.data);
        // this.schedulesData = jsonResult.data;
        this.schedulesData = this.facade.reformatScheduleData(jsonResult.data, rawValue.numOfWeeks, rawValue.employees);
        console.log('data', this.schedulesData);
      },
      err => {
        console.error('runPython err', err);
      }
    );

  }

  addEmployeesClick(): void {
    const modalRef = this.modalService.open(AddEmployeesComponent);
    modalRef.componentInstance.form = this.form;
  }

}
