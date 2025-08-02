import React, { useEffect } from "react";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import axios from '../utils/axios.js';
import { useLocation, useParams } from "react-router-dom";
import '../styling/viewchapters.css';
import { useNavigate } from 'react-router-dom';


export default function Viewchapters({user,setuser,mangass} ) {
const {id}=useParams();
const [chapters,setchapters]=useState([]);
const [iframeurl,setiframeurl]=useState(null);
const navigate=useNavigate();
const manga=mangass.find(manga=>manga._id==id);
useEffect(() => {
  const fetchManga = async () => {
    try {
      const res = await axios.get(`/mangas/getch/${id}`);
      const data = res.data;
      setchapters(data.mangaChapters || []);
    } catch (err) {
      console.error("Failed to fetch manga:", err);
    }
  };

  fetchManga();
}, [id]);
return(<>
    <Nav user={user} setuser={setuser}/>
  {manga ? (
    <>
    <div className="view-chapters-container">
  <div className="manga-header">
    <img
      className="manga-cover"
      src={`http://localhost:8000${manga.coverImage}`}
      alt={`${manga.title} Cover`}
    />
    <h1 className="manga-title">{manga.title}</h1>
    <p className="manga-description">{manga.description}</p>
  </div>

  <div className="chapters-list">
    <h2>Chapters</h2>
    <ul>
      {chapters.map((chapter, index) => (
       
        <li key={index} className="chapter-item">
          <a
            href={`http://localhost:8000/${chapter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chapter-link"
            
          >

            Chapter {index + 1}
          </a>
        </li>
      ))}
    </ul>
  </div>
</div>

     </>
  ) : (
    <div className="loading">Loading manga...</div>
  )}


</>)

}