export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    department: string;
}

export interface EmployeeApiResponse{
    users: Employee[];
    total: number;
    skip: number;
    limit: number;
}