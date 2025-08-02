import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import axios from '../utils/axios.js';
import { useNavigate,useLocation } from 'react-router-dom';


export default function Mymangas({ user }) {
  const [mangas, setmangas] = useState([]);
  const [allmangas,setallmangas]=useState([]);
  const navigate=useNavigate();

   useEffect(() => {
    const fetchMangas = async () => {
     try {
        const response = await axios.get('/mangas');
         const data = response.data;

      if (Array.isArray(data)) {
        setallmangas(data);
        const search=document.getElementById("searchbar");
        if(search.value==""){
          setmangas(allmangas);
        }
        else{
          const filteredMangas = allmangas.filter((manga) =>manga.title.toLowerCase().includes(search.value.toLowerCase()));
          setmangas(filteredMangas);
        }
      }
       else {
        console.log(data)
        console.error("Expected array but got:", data);
        setmangas([]); // fallback to empty array
      }
      }  catch (error) {
        console.error("Error fetching mangas:", error);
      }
    };
    fetchMangas();
  }, [mangas]);

  async function deletemanga(id) {
      await axios.post('/mangas/delete',{id},{withCredentials:true});
      setmangas(prev=>prev.filter(m=>m._id!=id));
  }

  function editmangahandler(id){
      navigate(`/editmanga/${id}`);
  }

  return <>
    <Nav user={user} setmangas={setmangas} mangas={mangas}/>
    <div>
      {mangas.map(manga => {
        if(manga.createBy===user._id){
        return (
            
          <div className="card mb-3" style={{width: "20rem"}}>
            <img src={`https://web-comic-site-backend.onrender.com${manga.coverImage}`} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{manga.title}</h5>
              <p className="card-text">{manga.description}</p>
              <a href="#" className="btn btn-primary m-1" onClick={()=>{editmangahandler(manga._id)}}>Edit Chapters</a>
              <a href="#" className="btn btn-primary" onClick={(e)=>{e.preventDefault();
                return deletemanga(manga._id)}}>Delete Manga</a>
            </div>
          </div>
        );}
      })}
    </div>

  </>
}