// components/Nav.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios.js';

export default function Nav({ user, setuser, setmangas, mangas }) {
  const navigate = useNavigate();
  const [search, setsearch] = useState("");

  function handlesearch(e) {
    e.preventDefault();
    const query = e.target.value.toLowerCase();
    setsearch(query);
    if(query!=""){
    const filtered = mangas.filter(m => m.title.toLowerCase().includes(query));
    setmangas(filtered);}
  }

  function createnewhandler() {
    navigate('/createnewmanga');
  }

  function loginclickhandler() {
    navigate("/login");
  }

  async function logoutClickHandler() {
    // You can add a real logout function here later
    try {
      await axios.post('/user/logout');
      setuser(null);
      navigate('/login');
    }
    catch (err) {
      console.error(err);
    }
  }
  function homeclickhandler() {
    navigate("/");
  }
  function signupclickhandler() {
    navigate("/register");
  }

  function mymangahandler() {
    navigate("/mymangas");
  }
  if (!user) {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">

          <a
            className="navbar-brand"
            href="#"
            onClick={homeclickhandler}
          >
            Manga-Buzz
          </a>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarScroll">
            {/* Left-side links */}
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={loginclickhandler}
                >
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={signupclickhandler}
                >
                  Create Account
                </a>
              </li>
            </ul>


            <form className="d-flex" role="search" onSubmit={e=>e.preventDefault()}>
              <input
                id="searchbar"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handlesearch}
              />
              
            </form>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Brand */}
          <a className="navbar-brand" href="#" onClick={homeclickhandler}>
            Manga-Buzz
          </a>

          {/* Toggler for small screens */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{ "--bs-scroll-height": "100px" }}
            >
              {/* Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  href="#"
                  id="navbarUserDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                  <img
                    src={`https://web-comic-site-backend.onrender.com${user.profileImage}`}
                    alt="User"
                    className="rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                  />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarUserDropdown">
                  <li>
                    <a className="dropdown-item" href="#" onClick={mymangahandler}>
                      My Mangas
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={createnewhandler}>
                      Create New
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={logoutClickHandler}>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Search Form */}
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                id="searchbar"
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handlesearch}
              />
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
