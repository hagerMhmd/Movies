/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Register from './Components/Register/Register';


function App() {

  const currentURL = window.location.href 
  // console.log(currentURL);
  const pathname = window.location.pathname
  // console.log(pathname);

  return <>
    <NavBar/>
   
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  </>
}
export default App;








// <NavBar />
// <div className='container'>
//   <Routes>
//     <Route path="/" element={<Register />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//     <Route path="/home" element={<Home />} />
//     <Route path="*" element={<h1>404</h1>} />
//   </Routes>

//   {/* <Register /> */}
//   {/* <Login/> */}

// </div>
// {/* <Home /> */}