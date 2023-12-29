package com.example.springlogin.Service.impl;

import com.example.springlogin.DTO.EmployeeDTO;
import com.example.springlogin.DTO.LoginDTO;
import com.example.springlogin.Entity.Employee;
import com.example.springlogin.Repository.EmployeeRepo;
import com.example.springlogin.Service.EmployeeService;
import com.example.springlogin.response.LoginResponse;
import org.apache.commons.codec.EncoderException;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeIMPL implements EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public String addEmployee(EmployeeDTO employeeDTO) {

        Employee employee = new Employee(
                employeeDTO.getEmployeeId(),
                employeeDTO.getEmployeeName(),
                employeeDTO.getEmail(),

                this.passwordEncoder.encode(employeeDTO.getPassword())
        );
        employeeRepo.save(employee);

        return employee.getEmployeeName();
    }
    EmployeeDTO employeeDTO;
    @Override
    public LoginResponse loginEmployee(LoginDTO loginDTO) {
        String msg = "";
        Employee employee1 = employeeRepo.findByEmail(loginDTO.getEmail());
        if (employee1 != null) {
            String password = loginDTO.getPassword();
            String encodePassword = employee1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodePassword);
            if (isPwdRight) {
                Optional<Employee> employee = employeeRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodePassword);
                if (employee.isPresent()) {
                    return new LoginResponse("Login success", true);
                } else {
                    return new LoginResponse("Login failed", false);
                }
            } else {
                return new LoginResponse("Password not match", false);
            }
        } else {
            return new LoginResponse("Email not exist", false);
        }
    }

    @Override
    public List<EmployeeDTO> getEmployess() {
        List<Employee> getEmployees =employeeRepo.findAll();
        List<EmployeeDTO> employeeDTOList = new ArrayList<>();
        for(Employee a :getEmployees){
            EmployeeDTO employeeDTO1 = new EmployeeDTO(
                    a.getEmployeeId(),
                    a.getEmployeeName(),
                    a.getEmail(),
                    a.getPassword()
            );
            employeeDTOList.add(employeeDTO1);
        }
        return employeeDTOList;
    }

}
