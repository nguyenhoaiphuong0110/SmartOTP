package com.example.springlogin.Service;

import com.example.springlogin.DTO.EmployeeDTO;
import com.example.springlogin.DTO.LoginDTO;
import com.example.springlogin.response.LoginResponse;

import java.util.List;


public interface EmployeeService {

    String addEmployee(EmployeeDTO employeeDTO);

    LoginResponse loginEmployee(LoginDTO loginDTO);

    List<EmployeeDTO> getEmployess();
}
