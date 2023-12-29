package com.example.springlogin.Controller;

import com.example.springlogin.DTO.EmployeeDTO;
import com.example.springlogin.DTO.LoginDTO;
import com.example.springlogin.DTO.SecretKeyRequest;
import com.example.springlogin.Service.EmployeeService;
import com.example.springlogin.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @PostMapping(path = "/save")
    public String saveEmployee(@RequestBody EmployeeDTO employeeDTO){
        String id = employeeService.addEmployee(employeeDTO);
        return id;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> loginEmployee(@RequestBody LoginDTO loginDTO){
        LoginResponse loginResponse = employeeService.loginEmployee(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
    @GetMapping(path = "/getEmployee")
    public List<EmployeeDTO>getAllEmployee(){
        List<EmployeeDTO>allEmployees = employeeService.getEmployess();
        return allEmployees;
    }
}
