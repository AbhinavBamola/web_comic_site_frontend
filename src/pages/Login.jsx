import React from "react";
import { Navigate } from "react-router-dom";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios.js';


export default function Login({ setuser }) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate=useNavigate();
     
   async function submithandler(e){
    e.preventDefault();
       try{
       await axios.post('/user/signin',{email,password});
       const res=await axios.get('/api/me');
       setuser(res.data);
       navigate('/');
    }
    catch(err){
        alert('Invalid Credentials');
    }
    }

    return <>
        <Nav /> 
        <form className="mt-4" >
            <div className="mb-3">
                <label className="form-label" >Email address</label>
                <input type="email" className="form-control" id="Email1" onChange={e=>{setemail(e.target.value)}}    aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" onChange={e=>{setpassword(e.target.value)}} id="exampleInputPassword1" />
            </div>
            <button type="submit" onClick={submithandler} className="btn btn-primary">Submit</button>
        </form>
    </>
}