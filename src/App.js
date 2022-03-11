import { Route, Routes } from 'react-router-dom';
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

function App() {
  return <>
    <NavBar />
    <div className='container'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='people' element={<People />} />
        <Route path='tv' element={ <Tv />} />
        <Route path='movies' element={ <Movies />} />
        <Route path='network' element={ <Network/>} />
        <Route path='login' element={ <Login/>} />
        <Route path='register' element={ <Register/>} />
        <Route path='*' element={ <h2>404</h2>} />
      </Routes>
    </div>
  </>;
}

export default App;


