import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiDataService {

  constructor(
    private httpClient: HttpClient
  ) {}

  // User APIs

  getUserList(): Observable<any> {
    return this.httpClient.get('api/indexUserList');
  }

  runPython(): Observable<any> {
    return this.httpClient.get('api/runPython');
  }

  runPythonScheduler(schedulerData: any): Observable<any> {
    return this.httpClient.post('api/runPythonScheduler', schedulerData);
  }

}
