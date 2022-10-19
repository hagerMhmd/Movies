import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  //--------------------- Register Variables -----------------------------
  let navigate = useNavigate()
  const [user, setUser] = useState({ first_name: '', last_name: '', age: 0, email: '', password: '' })
  const [error, seterror] = useState('')
  const [isloading, setIsloading] = useState(false)
  const [errorList, setErrorList] = useState([])
<<<<<<< HEAD
  // -------------------- get user data from inputs -------------------
  function getUser({ target }) {
    setUser({ ...user, [target.name]: target.value })
  }
  // ----------------------- Register Api Integration -----------------------
=======

  function getUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setuser(myUser)
  }

  function submitRegister(e) {
    e.preventDefault()
    setIsloading(true)

    let validationRestult = validateRegisterForm(user)
    if (validationRestult.error) {
      setIsloading(false)
      setErrorList(validationRestult.error.details)
      console.log(errorList);
    } else {
      checkApi()
    }
  }

>>>>>>> 63fbf9ca720d7a16d6120f0ab720ed23bfb3401b
  async function checkApi() {
    let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
    if (data.message === 'success') {
      console.log('success');
      navigate('/movies')
      setIsloading(false)
    } else {
      let index = data.message.lastIndexOf(":")
      let error = data.message.substr(index + 1)
      seterror(error)
      setIsloading(false)
    }
  }
<<<<<<< HEAD
  //-------------------- validate form -------------------
=======

>>>>>>> 63fbf9ca720d7a16d6120f0ab720ed23bfb3401b
  function validateRegisterForm() {
    let schema = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
<<<<<<< HEAD
      password: Joi.string().pattern(/[A-Za-z0-9]{8,25}$/)
=======
      password: Joi.string().pattern(/[A-Za-z0-9]{10,25}$/)
>>>>>>> 63fbf9ca720d7a16d6120f0ab720ed23bfb3401b
      // password: Joi.string().min(3).max(15).required()
    })
    return schema.validate(user, { abortEarly: false })
  }
  // ------------------------- main function -------------------
  function submitRegister(e) {
    e.preventDefault()
    setIsloading(true)
    let validationRestult = validateRegisterForm(user)
    if (validationRestult.error) {
      setIsloading(false)
      setErrorList(validationRestult.error.details)
      console.log(errorList);
    } else {
      checkApi()
    }
  }
  return <>
    <h2 className='my-4'>Register Now</h2>
    {/* --------------- dispaly errors ------------------- */}
    {errorList.map((error, index) => {
      if (error.path[0] === 'password') {
        return <div key={index} className="text-danger mb-3">Password invalid</div>
      } else {
        return <div key={index} className="text-danger mb-3">{error.message}</div>
      }
    }
    )}
    <form onSubmit={submitRegister}>
      <label htmlFor="first_name">First Name</label>
      <input onChange={getUser} type="text" className='form-control py-2 my-3' name='first_name' id='first_name' />
      <label htmlFor="last_name">Last Name</label>
      <input onChange={getUser} type="text" className='form-control py-2 my-3' name='last_name' id='last_name' />
      <label htmlFor="age">Age</label>
      <input onChange={getUser} type="number" className='form-control py-2 my-3' name='age' id='age' />
      <label htmlFor="email">Email</label>
      <input onChange={getUser} type="email" className='form-control py-2 my-3' name='email' id='email' />
      {error ? <div className="text-danger mb-3">{error}</div> : ''}
      <label htmlFor="password">Password</label>
      <input onChange={getUser} type="password" className='form-control py-2 my-3' name='password' id='password' />
      <button className='btn btn-outline-info my-2'>{isloading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
    </form>
  </>
}
