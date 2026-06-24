import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  employeeForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ){
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }
  onSubmit(): void{
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }

    const newEmployeeData = this.employeeForm.value;

    this.employeeService.addEmployee(newEmployeeData).subscribe({
      next:(response)=>{
        // DummyJSON returns the created object along with a newly generated ID
        this.successMessage = `Successfully added ${response.firstName} ${response.lastName}!`;
        this.errorMessage = '';
        this.employeeForm.reset(); // Clear the form
      },
      error: (err) => {
        this.errorMessage = 'Failed to add employee. Please try again.';
        this.successMessage = '';
        console.error(err);
      }
    })
  }
}
