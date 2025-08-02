import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from '../components/nav.jsx'
import { useState } from "react";
import axios from '../utils/axios.js';

export default function Createnew({ user }) {
    const navigate=useNavigate();
    const [title, settitle] = useState("");
    const [description, setdesc] = useState("");
    const [coverImage, setci] = useState(null);

    async function handlesubmit(e) {
            e.preventDefault();
        try {
            const formdata = new FormData();
            formdata.append('title', title);
            formdata.append('description', description);
            if (coverImage) {
                formdata.append('coverImage', coverImage);
            }
            await axios.post('/mangas', formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });
            navigate('/mymangas')
        }
        catch (err) { console.log(err) }
    }
    return <>
        <Nav user={user} />
        <form>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={e => settitle(e.target.value)} />
            </div>
            <div className="form-floating">
                <textarea className="form-control" placeholder="Describe Your Manga" id="floatingTextarea2" onChange={e => setdesc(e.target.value)} style={{ height: "100px" }} ></textarea>
                <label >Description</label>
            </div><br />
            <div className="mb-3 form-check">
                <label className="form-check-label" >Upload Cover Image</label>
                <input type="file" className="form-control" onChange={e => setci(e.target.files[0])} id="exampleCheck1" accept="image/" />
                
            </div>
            <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Submit</button>
        </form>

    </>
}