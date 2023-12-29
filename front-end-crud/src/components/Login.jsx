import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"


const Login = () => {
    const[email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate("");

    // gọi API từ server, ứng dụng đăng nhập riêng
    async function login(event){
        event.preventDefault();
        try{
            await axios.post("http://localhost:8091/api/v1/employee/login",{
                email:email,
                password:password,
            }).then((res) =>{
                console.log(res.data);
                if(res.data.message === "Email not exist"){
                    alert("Email not exist");
                }else if(res.data.message === "Login success"){
                    alert("Login success");
                    navigate("/home");
                    
                }
                else{
                    alert("Email and Password is not correct")
                }
            }, fail =>{
                console.log(fail);
            })
        }catch(err){
            alert(err);
        }
    }
    
    // giao diện đăng nhập tài khoản
  return (
    <div>
            <div className="container">
            <div className="row">
                <h2>Login</h2>
             <hr/>
             </div>
             <div className="row">
             <div className="col-sm-6">
 
            <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email"  className="form-control" id="email" placeholder="Enter Name"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />
        </div>
        <div className="form-group">
            <label>password</label>
            <input type="password"  className="form-control" id="password" placeholder="Enter Fee"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                  <button type="submit" className="btn btn-primary" onClick={login} >Login</button>
              </form>
            </div>
            </div>
            </div>
     </div>
  )
}

export default Login