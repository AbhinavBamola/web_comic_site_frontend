import React from "react";
import { Navigate } from "react-router-dom";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios.js';



export default function Register({ setuser }) {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [profilephoto, setci]=useState(null);
    const navigate=useNavigate();
     
   async function submithandler(e){
    e.preventDefault();
       try{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if(profilephoto){
            formData.append('profilephoto', profilephoto);
        }
       await axios.post('/user/signup',formData,{
        headers:{
            "Content-Type":"multipart/form-data",
        },
        withCredentials:true
       });
       const res=await axios.get('/api/me');
       setuser(res.data);
       navigate('/');
    }
    catch(err){
          console.error("Registration error:", err.response?.data || err.message);
  alert(err.response?.data?.error || "Registration failed");
    }
    }

    return <>
        <Nav /> 
        <form className="mb-4">
            <div className="mb-3">
                <label >Name</label>
                <input type="email" className="form-control" id="Email1" onChange={e=>{setname(e.target.value)}}    aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label  className="form-label" >Email address</label>
                <input type="email" className="form-control" id="Email" onChange={e=>{setemail(e.target.value)}}    aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" onChange={e=>{setpassword(e.target.value)}} id="exampleInputPassword1" />
            </div>
               <div className="mb-3 form-check">
                <label className="form-check-label" >Upload Profile Photo</label>
                <input type="file" className="form-control" onChange={e => setci(e.target.files[0])} id="exampleCheck1" accept="image/" />
                
            </div>
            <button type="submit" onClick={submithandler} className="btn btn-primary">Submit</button>
        </form>
    </>
}