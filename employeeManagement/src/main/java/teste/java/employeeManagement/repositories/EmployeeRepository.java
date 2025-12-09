package teste.java.employeeManagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import teste.java.employeeManagement.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}
