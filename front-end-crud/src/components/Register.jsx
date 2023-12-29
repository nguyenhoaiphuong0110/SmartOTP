import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Register = () => {
    const[employeeName,setEmployeeName] = useState("");
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate("");

// gọi API đăng kí tài khoản từ ứng dụng đăng nhập riêng
    async function save(event){
        event.preventDefault();
        try{
            await axios.post("http://localhost:8091/api/v1/employee/save",{
                employeeName:employeeName,
                email:email,
                password:password,
            });
            alert("Success!");
            navigate("/login")
        }catch(err){
            alert(err);
        }
    }

    // giao diện đăng kí tài khoản
  return (
    <div>
    <div className="container mt-4" >
    <div className="card">
            <h1>Student Registation</h1>
    
    <form>
        <div className="form-group">
          <label>Employee name</label>
          <input type="text"  className="form-control" id="employeename" placeholder="Enter Name"
          
          value={employeeName}
          onChange={(event) => {
            setEmployeeName(event.target.value);
          }}
          />
        </div>
        <div className="form-group">
          <label>email</label>
          <input type="email"  className="form-control" id="email" placeholder="Enter Email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
 
        </div>
        <div className="form-group">
            <label>password</label>
            <input type="password"  className="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
        <button type="submit" className="btn btn-primary mt-4" onClick={save} >Save</button>
       
      </form>
    </div>
    </div>
     </div>
  )
}

export default Register