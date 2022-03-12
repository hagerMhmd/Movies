import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-transpatent">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2" to="home">Noxe</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {props.userDate ? <>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="network">Network</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="movies">Movies </Link>
              </li>
            </> : ''}

          </ul>
          <ul className="navbar-nav ms-auto mb-2 me-5 mb-lg-0 ">
            <li className="nav-item d-flex align-items-center me-3 ">
              <i className="fa-brands mx-2 fs-5 fa-instagram"></i>
              <i className="fa-brands mx-2 fs-5 fa-facebook-f"></i>
              <i className="fa-brands mx-2 fs-5 fa-youtube"></i>
              <i className="fa-brands mx-2 fs-5 fa-spotify"></i>
            </li>
            {props.userDate ?
              <>
                <li className="nav-item">
                  <span className="nav-link logOut" aria-current="page" onClick={props.logOut}>LogOut</span>
                </li>
              </> :
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="login">Login</Link>
                </li>
              </>}
          </ul>
        </div>
      </div>
    </nav>
  </>
}




// https://route-egypt-api.herokuapp.com