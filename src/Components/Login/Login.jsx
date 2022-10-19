import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login(props) {
  //--------------------- Login Variables -----------------------------
  let navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })
  const [isloading, setIsloading] = useState(false)
  const [errorList, setErrorList] = useState([])
  const [error, seterror] = useState('')
  // -------------------- get user data from inputs -------------------
  function getUser({ target }) {
    setUser({ ...user, [target.name]: target.value })
  }
  // ----------------------- Movie Api Integration -----------------------
  async function checkApi() {
    let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user)
    if (data.message === 'success') {
      localStorage.setItem('moviesUserToken', data.token)
      props.getUserData()
      navigate('/movies')
      setIsloading(false)
    } else {
      let index = data.message.lastIndexOf(":")
      let error = data.message.substr(index + 1)
      seterror(error)
      setIsloading(false)
    }
  }
  //-------------------- validate form -------------------
  function validateRegisterForm() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/[A-Za-z0-9]{10,25}$/)
    })
    return schema.validate(user, { abortEarly: false })
  }
  // ------------------ show errors ---------------------
  function errorMessage(message, i) {
    return <div key={i} className="text-danger mb-3">{message}</div>
  }
  // ------------------------- main function -------------------
  function submitLogin(e) {
    e.preventDefault()
    setIsloading(true)
    let validationRestult = validateRegisterForm(user)
    if (validationRestult.error) {
      setIsloading(false)
      setErrorList(validationRestult.error.details)
    } else {
      checkApi()
    }
  }

  return <>
    <h2 className='my-4'>Login</h2>
    {errorList.map((error, index) => {
      if (error.context.value === '') {
        return errorMessage(error.message, index)
      } else if (error.path[0] === 'password') {
        return errorMessage('Password invalid', index)
      } else {
        return errorMessage(error.message, index)
      }
    }
    )}


    <form onSubmit={submitLogin}>
      <label htmlFor="email">Email</label>
      <input onChange={getUser} type="email" className='form-control py-2 my-3' name='email' id='email' />
      <label htmlFor="password">Password</label>
      <input onChange={getUser} type="password" className='form-control py-2 my-3' name='password' id='password' />
      {error ? <div className="text-danger mb-3">{error}</div> : ''}
      <button className='btn btn-outline-info my-2'>{isloading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
    </form>

  </>
}
