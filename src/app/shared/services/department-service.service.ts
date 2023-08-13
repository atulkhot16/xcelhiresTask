import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { Department } from '../models/department.model';
import * as Papa from 'papaparse';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  static baseUrl = 'http://65.0.155.254:5001/admin/department/list';
  static addDeptUrl = 'http://65.0.155.254:5001/admin/department/add';
  static updateNameUrl = 'http://65.0.155.254:5001/admin/department/update';
  static importUrl = 'http://65.0.155.254:5001/admin/department/import';
  private readFile(file: File): Observable<string> {
    return new Observable<string>(observer => {
      const reader = new FileReader();
      reader.onload = () => {
        observer.next(reader.result as string);
        observer.complete();
      };
      reader.readAsText(file);
    });
  }
  private parseCSV(contents: string): any[] {
      const options = {
        header: false,
        skipEmptyLines: true
      };
      const parsed = Papa.parse(contents, options);
      return parsed.data;
  }
  private uploadParsedData(data: any[]): Observable<any> {
      const requests: Observable<any>[] = [];
      for (const item of data) {
        const request = this.http.post(DepartmentService.importUrl, item);
        requests.push(request);
      }
      return forkJoin(requests);
  }
  constructor(private http: HttpClient) { }
  getDepartments(): Observable<Department[] | any> {
    return this.http.get<any>(DepartmentService.baseUrl).pipe(tap((ele: any) => { return ele }), map((ele: any) => { return ele.data.rows }))
  }
  addDepartments(deptName: string) {
    const deptData = {
      name: deptName
    }
    return this.http.post<any>(DepartmentService.addDeptUrl, deptData)
  }
  updateDepartmentName(data: any) {
    return this.http.post(DepartmentService.updateNameUrl, data)
  }
  importDepartmentsFromCSV(file: File): Observable<any> {
    return this.readFile(file).pipe(
      map(contents => this.parseCSV(contents)),
      map(parsedData => this.uploadParsedData(parsedData))
    );
  }
}
