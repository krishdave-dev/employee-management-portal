import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees: Employee[] = [];
  successMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService // <-- 2. Inject Service
  ) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.spinner.show(); // <-- 3. SHOW spinner before API call

    this.employeeService.getEmployee().subscribe({
      next: (response) => {
        this.employees = response.users;
        this.spinner.hide(); // <-- 4. HIDE spinner on success
      },
      error: (err) => {
        console.error('Failed to load employees', err);
        this.spinner.hide(); // <-- 5. HIDE spinner on error! (Crucial)
      }
    });
  }

  onDelete(id: number, name: string): void {
    const isConfirmed = window.confirm(`Are you sure you want to delete ${name}?`);

    if (isConfirmed) {
      this.spinner.show(); // <-- SHOW spinner while deleting

      this.employeeService.deleteEmployee(id).subscribe({
        next: (response) => {
          this.employees = this.employees.filter(emp => emp.id !== id);
          this.successMessage = `Employee ${name} deleted successfully.`;
          setTimeout(() => this.successMessage = '', 3000);
          
          this.spinner.hide(); // <-- HIDE on success
        },
        error: (err) => {
          console.error('Failed to delete employee', err);
          alert('Could not delete employee. Please try again.');
          
          this.spinner.hide(); // <-- HIDE on error
        }
      });
    }
  }
}