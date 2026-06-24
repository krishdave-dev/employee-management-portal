import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee,EmployeeApiResponse } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient){}// injecting httpclient service into service

  getEmployee(): Observable<EmployeeApiResponse>{
    return this.http.get<EmployeeApiResponse>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee( employeeData: Partial<Employee>): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/add`, employeeData);
  }
  updateEmployee(id: number, employeeData: Partial<Employee>): Observable<Employee>{
    return this.http.put<Employee>(`${this.apiUrl}/${id}`,employeeData);
  }

  deleteEmployee(id:number): Observable<Employee>{
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`);
  }
}
