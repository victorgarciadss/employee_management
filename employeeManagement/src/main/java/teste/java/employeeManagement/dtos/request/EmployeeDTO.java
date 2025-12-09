package teste.java.employeeManagement.dtos.request;

import java.time.LocalDate;

public record EmployeeDTO(
        String name,
        LocalDate admissionDate,
        Double salary,
        String status
) {
}
