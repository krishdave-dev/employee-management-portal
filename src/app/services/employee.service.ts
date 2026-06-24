import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; // <-- Import throwError
import { map, tap, catchError } from 'rxjs/operators'; // <-- IMPORT RxJS OPERATORS
import { Employee,EmployeeApiResponse } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient){}// injecting httpclient service into service

  getEmployee(): Observable<Employee[]> {
    return this.http.get<EmployeeApiResponse>(this.apiUrl).pipe(
      tap(response => console.log('RAW API RESPONSE (from tap):', response)),
      // Task 10: RxJS map() operator intercepts the HTTP response
      map((response: EmployeeApiResponse) => {
        
        // 1. Transform the data (Task 10)
        let transformedUsers = response.users.map(user => ({
          ...user, // Keep all existing properties
          fullName: `${user.firstName} ${user.lastName}`, // Combine names
          department: user.company?.department || 'Unassigned' // Flatten department
        }));

        // 2. Filter the data (Task 11)
        // DummyJSON uses "Engineering" or "IT" for tech roles
        transformedUsers = transformedUsers.filter(
          user => user.department === 'Engineering' || user.department === 'IT'
        );

        // We now return just the clean, modified array to the component!
        catchError((error: HttpErrorResponse) => {
        // You can log the actual technical error to the console for the developer
        console.error('An API error occurred:', error);
        
        // But return a user-friendly message to the component
        return throwError(() => new Error('Unable to Load Employee Data'));
      })
              return transformedUsers;

      })
    );
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
