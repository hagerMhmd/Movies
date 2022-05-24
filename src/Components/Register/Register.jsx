import axios from 'axios'
import Joi from 'joi'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let navigate  = useNavigate()

  const [user, setuser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    email: '',
    password: ''
  })
  const [error, seterror] = useState('')
  const [isloading, setIsloading] = useState(false)
  const [errorList, setErrorList] = useState([])

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

  async function checkApi() {
    let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
    if (data.message === 'success') {
      console.log('success');  // navigate to home page
      navigate('/movies')
      setIsloading(false)
    } else {
      let index = data.message.lastIndexOf(":")
      let error = data.message.substr(index + 1)
      seterror(error)
      setIsloading(false)
    }
  }

  function validateRegisterForm() {
    let schema = Joi.object({
      first_name: Joi.string().min(3).max(10).required(),
      last_name: Joi.string().min(3).max(10).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/[A-Za-z0-9]{10,25}$/)
      // password: Joi.string().min(3).max(15).required()
    })
    return schema.validate(user, { abortEarly: false })
  }

  return <>
    <h2 className='my-4'>Register Now</h2>

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
      {/* { errorList[0].path[0] ===  'first_name' ? <div className="text-danger mb-3">{errorList[0].message}</div> : ''} */}



      <label htmlFor="last_name">Last Name</label>
      <input onChange={getUser} type="text" className='form-control py-2 my-3' name='last_name' id='last_name' />
      {/* {errorList[0].path[0] ===  'first_name' ? <div className="text-danger mb-3">{errorList[1].message}</div> :''  } */}



      <label htmlFor="age">Age</label>
      <input onChange={getUser} type="number" className='form-control py-2 my-3' name='age' id='age' />
      {/* { errorList[0].path[0] ===  'first_name' ? <div className="text-danger mb-3">{errorList[2].message}</div> :''  } */}



      <label htmlFor="email">Email</label>
      <input onChange={getUser} type="email" className='form-control py-2 my-3' name='email' id='email' />
      {/* { errorList[0].path[0] ===  'first_name' ? <div className="text-danger mb-3">{errorList[3].message}</div> :''  } */}

      {error ? <div className="text-danger mb-3">{error}</div> : ''}


      <label htmlFor="password">Password</label>
      <input onChange={getUser} type="password" className='form-control py-2 my-3' name='password' id='password' />
      {/* { errorList[0].path[0] ===  'first_name' ? <div className="text-danger mb-3">{errorList[4].message}</div> :'' } */}



      <button className='btn btn-outline-info my-2'>{isloading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
    </form>

  </>
}
