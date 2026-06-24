export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  fullName?: string; // <-- New field we will generate
  email: string;
  phone: string;
  department?: string; // <-- Flattened field
  company?: {          // <-- How DummyJSON actually sends it
    department: string;
  };
}

export interface EmployeeApiResponse{
    users: Employee[];
    total: number;
    skip: number;
    limit: number;
}