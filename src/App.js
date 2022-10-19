import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar/NavBar.jsx';
import Movies from './Components/Movies/Movies.jsx'
import About from './Components/About/About.jsx'
import People from './Components/People/People.jsx'
import Tv from './Components/Tv/Tv.jsx'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { MediaContexProvider } from './MediaContex';

function App() {
  let navigate = useNavigate()
  const [userDate, setUserDate] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('moviesUserToken')) {
      getUserData()
    }
  }, [])

  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem('moviesUserToken'))
    setUserDate(decodedToken)
  }
  useEffect(() => {
    // console.log(userDate);
  }, [userDate])

  function logOut() {
    localStorage.removeItem('moviesUserToken')
    setUserDate(null)
    navigate('/login')
  }

  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('moviesUserToken')) {
      return <Navigate to='/login' />
    } else {
      return children
    }
  }

  return <>
    <NavBar userDate={userDate} logOut={logOut} />
    <div className='container'>
      <MediaContexProvider>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='movies' element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path='about' element={<ProtectedRoute><About /></ProtectedRoute>}  / >
          <Route path='home' element={<ProtectedRoute><Home /></ProtectedRoute>}  / >
          <Route path='moviedetails' element={<MovieDetails />} >
            <Route path=':id' element={<MovieDetails />} />
          </Route>
          <Route path='people' element={<People />} />
          <Route path='tv' element={<Tv />} />
          {/* <Route path='movies' element={<People />} /> */}
          <Route path='login' element={<Login getUserData={getUserData} />} />
          <Route path='register' element={<Register />} />
          <Route path='*' element={<h2>404</h2>} />
        </Routes>
      </MediaContexProvider>
    </div>
  </>;
}

export default App;