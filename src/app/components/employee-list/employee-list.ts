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

errorMessage: string = '';
  employees: Employee[] = [];
  successMessage: string = '';
  // Add these properties to store our dashboard metrics
  totalEmployees: number = 0;
  activeEmployees: number = 0;
  inactiveEmployees: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService // <-- 2. Inject Service
  ) {}

  

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.spinner.show();
    this.errorMessage = '';

    this.employeeService.getEmployee().subscribe({
      next: (cleanEmployeeArray) => {
        this.employees = cleanEmployeeArray;
        
        // --- TASK 14 DASHBOARD CALCULATION ---
        this.totalEmployees = this.employees.length;
        
        // Let's pretend an employee is "Inactive" if they don't have a phone number listed
        this.inactiveEmployees = this.employees.filter(emp => !emp.phone || emp.phone.trim() === '').length;
        this.activeEmployees = this.totalEmployees - this.inactiveEmployees;

        this.spinner.hide();
      },
      error: (err: Error) => {
        this.errorMessage = err.message;
        this.spinner.hide();
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