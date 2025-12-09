package teste.java.employeeManagement.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import teste.java.employeeManagement.dtos.request.EmployeeDTO;
import teste.java.employeeManagement.entities.Employee;
import teste.java.employeeManagement.repositories.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Transactional
    public void registerEmployee(EmployeeDTO employeeDTO) {
        Employee employee = new Employee();

        employee.setName(employeeDTO.name());
        employee.setAdmissionDate(employeeDTO.admissionDate());
        employee.setSalary(employeeDTO.salary());
        employee.setStatus(employeeDTO.status());

        employeeRepository.save(employee);
    }
}
