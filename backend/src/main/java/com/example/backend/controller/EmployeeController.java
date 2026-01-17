package com.example.backend.controller;

import com.example.backend.model.Employee;
import com.example.backend.service.DataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/employees")
public class EmployeeController {

    private final DataService service;

    public EmployeeController(DataService service) {
        this.service = service;
    }

    // VIEW ALL employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return service.employees;
    }

    // ADD employee
    // @PostMapping
    // public Employee addEmployee(@RequestBody Employee emp) {
    // emp.id = service.nextEmployeeId();
    // service.employees.add(emp);
    // return emp;
    // }
    @PostMapping(consumes = "application/json", produces = "application/json")
    public Employee addEmployee(@RequestBody Employee emp) {
        emp.id = service.nextEmployeeId();
        service.employees.add(emp);
        return emp;
    }

    // UPDATE employee
    @PutMapping("/{id}")
    public String updateEmployee(@PathVariable int id, @RequestBody Employee emp) {
        for (Employee e : service.employees) {
            if (e.id == id) {
                e.name = emp.name;
                return "Employee updated successfully";
            }
        }
        return "Employee not found";
    }

    // DELETE employee
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable int id) {
        boolean removed = service.employees.removeIf(e -> e.id == id);
        return removed ? "Employee deleted successfully" : "Employee not found";
    }
}
