import { useState,useEffect } from 'react'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Createnew from './pages/Createnew.jsx';
import Mymangas from './pages/Mymangas.jsx';
import Viewchapters from './pages/Viewchapters.jsx';
import Editmanga from './pages/Editmanga.jsx';
import axios from './utils/axios.js';



function App() {
  const [user,setuser]=useState(null);
  const [mangass,setmangass]=useState([]);

  useEffect(()=>{
    axios.get('/api/me')  
    .then((res)=>{setuser(res.data);})
    .catch((err)=>{setuser(null);})
  },[])

  useEffect(()=>{
    axios.get('/mangas').then((res)=>{setmangass(res.data);}).catch((err)=>{console.log(err)})
  })

  return (
   <BrowserRouter>
   <Routes>
      <Route  path='/' element={<Home user={user} setuser={setuser} />} />
      <Route path='/login' element={<Login setuser={setuser}/>} />
      <Route path='/register' element={<Register setuser={setuser}/>} />
      <Route path='/createnewmanga' element={<Createnew user={user}/>} />
      <Route path='/mymangas' element={<Mymangas user={user}/>} />
      <Route path="/manga/:id" element={<Viewchapters user={user} setuser={setuser} mangass={mangass} />} />
      <Route path="/editmanga/:id" element={<Editmanga user={user} setuser={setuser} mangass={mangass} />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
