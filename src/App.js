import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import People from './Components/People/People.jsx'
import Tv from './Components/Tv/Tv.jsx'
import Movies from './Components/Movies/Movies.jsx'
import Network from './Components/Network/Network.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetails from './Components/MovieDetails/MovieDetails';

function App() {
  let navigate = useNavigate()
  const [userDate, setUserDate] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getUserData()
    }
  }, [])

  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('userToken'))
    setUserDate(decodedToken)
  }
  useEffect(() => {
    console.log(userDate);
  }, [userDate])

  function logOut() {
    localStorage.removeItem('userToken')
    setUserDate(null)
    navigate('/login')
  }

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('userToken')) {
      return <Navigate to='/login' />
    } else {
      return children
    }
  }

  return <>
    <NavBar userDate={userDate} logOut={logOut} />
    <div className='container'>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='about' element={<About />} />
        <Route path='moviedetails' element={<MovieDetails />} >
        <Route path=':id' element={<MovieDetails />} />
        </Route>
        <Route path='people' element={<People />} />
        <Route path='tv' element={<Tv />} />
        <Route path='movies' element={<Movies />} />
        <Route path='network' element={<Network />} />
        <Route path='login' element={<Login getUserData={getUserData} />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<h2>404</h2>} />
      </Routes>
    </div>
  </>;
}

export default App;


