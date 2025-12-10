package teste.java.employeeManagement.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teste.java.employeeManagement.dtos.request.EmployeeDTO;
import teste.java.employeeManagement.entities.Employee;
import teste.java.employeeManagement.services.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> listAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();

        return ResponseEntity.status(HttpStatus.OK).body(employees);
    }

    @PostMapping(value = "/register")
    public ResponseEntity<String> registerEmployee(@RequestBody EmployeeDTO employeeDTO) {
        employeeService.registerEmployee(employeeDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body("Novo funcionário cadastrado com sucesso!");
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário excluido com sucesso!");
    }
}
