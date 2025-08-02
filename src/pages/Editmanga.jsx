import React, { useEffect } from "react";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import axios from '../utils/axios.js';
import { useLocation, useParams } from "react-router-dom";
import '../styling/viewchapters.css';


export default function Editmanga({user,setuser,mangass} ) {
const {id}=useParams();
const location=useLocation();
const [chapters,setchapters]=useState([]);
const [file,setfile]=useState(null);
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


  async function handlesubmit(e){
    
        e.preventDefault();
        document.getElementById('chapter-upload').value="";
        setfile(null);
        if(!file){
            console.log("File empty")
        }
        const formdata=new FormData();
        formdata.append("chapter",file);
        try{
           const res= await axios.post(`/mangas/addnewchapter/${manga._id}`,formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            setchapters(prev=>[...prev,res.chapterpath])
        }
        catch(error){
                console.log(error);
        }
        
  }

return(<>
    <Nav user={user} setuser={setuser}/>
  {manga ? (
    <>
    <div className="view-chapters-container">
  <div className="manga-header">
    <img
      className="manga-cover"
      src={`https://web-comic-site-backend.onrender.com${manga.coverImage}`}
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
            href={`https://web-comic-site-backend.onrender.com${chapter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chapter-link"
          >
            Chapter {index + 1}
          </a>
        </li>
      ))}
    </ul>
    <form className="upload-form" onSubmit={handlesubmit} >
  <label htmlFor="chapter-upload" className="upload-label">
    Upload New Chapter:
  </label>
  <input
    type="file"
    id="chapter-upload"
    accept=".pdf"
    onChange={e=>{
        console.log(e.target.files[0])
        setfile(e.target.files[0])}}
    className="upload-input"
  />
  <button type="submit" className="upload-button">Upload</button>
</form>

  </div>
</div>

     </>
  ) : (
    <div className="loading">Loading manga...</div>
  )}


</>)

}