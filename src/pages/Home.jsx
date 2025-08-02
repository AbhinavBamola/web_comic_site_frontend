import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import axios from '../utils/axios.js';
import { useNavigate,useLocation } from 'react-router-dom';




export default function Home({ user ,setuser}) {
  const [Name, setname] = useState("Guest");
  const [image, setimage] = useState(null);
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
      } catch (error) {
        console.error("Error fetching mangas:", error);
      }
    };
    fetchMangas();
  }, [mangas]);

  function viewchaptershandler(id){
        navigate(`/manga/${id}`, {
  state: {
    user: user,
    mangas: allmangas
  }}
);
  }

  const displayingmangas=mangas.map(manga => 
    
          <div className="card" key={manga._id} style={{width: "18rem"}}>
            <img src={`https://web-comic-site-backend.onrender.com${manga.coverImage}`} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{manga.title}</h5>
              <p className="card-text">{manga.description}</p>
              <a href="#" className="btn btn-primary" onClick={()=>viewchaptershandler(manga._id)}>View Chapters</a>
            </div>
          </div>
  )
  return <>
    <Nav user={user} setuser={setuser} setmangas={setmangas} mangas={mangas} />
    <div>
      {displayingmangas}
    </div>

  </>
}