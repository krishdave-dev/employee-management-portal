import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId!: number; // The '!' tells TypeScript we will definitely initialize this later
  isLoading: boolean = true;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    // 1. Setup the empty form structure first
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit(): void {
    // 2. Grab the ID from the URL
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.employeeId) {
      // 3. Fetch the employee data
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employeeData) => {
          // 4. Fill the form with the fetched data
          this.employeeForm.patchValue({
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            phone: employeeData.phone
          });
          this.isLoading = false; // Stop loading state
        },
        error: (err) => {
          this.errorMessage = 'Could not load employee details.';
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const updatedData = this.employeeForm.value;

    // 5. Send the PUT request
    this.employeeService.updateEmployee(this.employeeId, updatedData).subscribe({
      next: (response) => {
        this.successMessage = `Successfully updated details for ${response.firstName}!`;
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = 'Failed to update employee.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}