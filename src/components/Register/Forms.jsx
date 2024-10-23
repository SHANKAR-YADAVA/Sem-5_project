import React, { useState } from 'react'
import './Form.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Forms = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const ValidationError = validateForm(formData);
    
    axios.post('http://localhost:8080/signup', {username, email, password})
    .then(res => console.log(res))
    .catch(err => console.log(err))
    navigate('/login')

    setErrors(ValidationError);
    if (Object.keys(ValidationError).length === 0) {
      console.log("Successfully Submitted", formData);
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const validateForm = (data) => {
    let errors = {};
    if (!data.username) {
      errors.username = 'User name required!!!'
    }
    if (!data.email) {
      errors.email = 'Email required!!!'
    } else if (!validateEmail(data.email)) {
      errors.email = 'Invalid email!!!'
    }
    if (!data.password) {
      errors.password = 'Incorrect password!!!'
    }

    return errors;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  return (
    <div className='contain'>
      <div className='form-container'>
        <h2>Registration Form</h2>
        <div className='form_wrapper'>
          <form onSubmit={handleSubmit}>
            <div className="form_control">
              <input
                type="text"
                name='username'
                placeholder='User name *'
                onChange={handleChange}
                value={formData.username}
              />
              {errors.username && <div className="error">{errors.username}</div>}
            </div>
            <div className="form_control">
              <input
                type="email"
                name='email'
                placeholder='Enter your Email *'
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div className="form_control">
              <label htmlFor="pwd">Password</label>
              <input
                type="password"
                id='pwd' name='password'
                onChange={handleChange}
                value={formData.password}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>
            <button type='Submit'>Register</button>
          </form>
        </div>
      </div >
    </div >
  )
}

export default Forms