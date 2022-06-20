import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify' 
import axios from "axios"                                 

function Login() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const generateError = (err) => toast.error(err,{
    position: "bottom-left",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await axios.post("http://localhost:4000/login", {
        ...values,
      },{
        withCredentials: true,
      });
      if(data){
        if(data.errors) {
          const { email,password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate('/')
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='login-wrapper'>
        <div className='sublogin-container'>
    <form className='create-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
    <div>
      <label>Email</label><br></br>
      <input className='box' name='email' placeholder='Email' type='email' onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <div>
      <label>Password</label><br></br>
      <input className='box' placeholder='Password' name='password' type='password' onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <div>
      {/* FP */}
    </div><br/>
    <button className='login-button'><b>Login</b></button>
    <br/><br/><hr/>
      Not A Member ? <Link to='/signup' className='link-click'>Sign Up</Link>
    </form>
    <ToastContainer/>
    </div>
    </div>
  )
}

export default Login