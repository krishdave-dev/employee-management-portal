import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
// We will create this component in the next step
import { EmployeeDetails } from './components/employee-details/employee-details';
import { AddEmployee } from './components/add-employee/add-employee';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee';
export const routes: Routes = [
    { path: '', redirectTo: 'employees', pathMatch: 'full' }, // Default route
  { path: 'employees', component: EmployeeList },
  { path: 'employee/:id', component: EmployeeDetails } ,// Dynamic route
    { path: 'add-employee', component: AddEmployee }, // <-- Add this route
    { path: 'edit-employee/:id', component: EditEmployeeComponent },
];
