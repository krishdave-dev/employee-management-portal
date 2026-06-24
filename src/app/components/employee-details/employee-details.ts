import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  imports: [],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    //read id from url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id){
      this.employeeService.getEmployeeById(id).subscribe({
        next: (data) =>{
          this.employee = data;
        },
        error: (err) =>{
          console.error('Error fetching employee details', err);
        }
      })
    }
  }
}
