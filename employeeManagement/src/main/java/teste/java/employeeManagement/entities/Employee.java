package teste.java.employeeManagement.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "tb_employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate admissionDate;

    @Column(nullable = false)
    private Double salary;

    @Column(nullable = false)
    private String status;

    public Employee(Long id, String name, LocalDate admissionDate, Double salary, String status) {
        this.id = id;
        this.name = name;
        this.admissionDate = admissionDate;
        this.salary = salary;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(id, employee.id) && Objects.equals(name, employee.name) && Objects.equals(admissionDate, employee.admissionDate) && Objects.equals(salary, employee.salary) && Objects.equals(status, employee.status);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, admissionDate, salary, status);
    }
}
