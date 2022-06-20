import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify' 
import axios from "axios"

function Signup() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
      name: "",
      mobile: "",
      address: "",
      email: "",
      password: "",
    })

    const generateError = (err) => toast.error(err,{
      position: "bottom-left",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const { data } = await axios.post("http://localhost:4000/signup", {
            ...values,
          },{
            withCredentials: true,
          });
          console.log(data)
          if(data){
            if(data.errors) {
              const { name,mobile,address,email,password } = data.errors;
              if (name) generateError(name);
              else if (mobile) generateError(mobile);
              else if (address) generateError(address);
              else if (email) generateError(email);
              else if (password) generateError(password);
            } else {
              navigate('/login')
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
        <h2>Sign Up</h2>
    <div>
      <label>Name</label><br></br>
      <input className='box' name='name' placeholder='Name' onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <div>
      <label>Phone Number</label><br></br>
      <input className='box' name='mobile' placeholder='Phone Number' onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <div>
      <label>Home Address</label><br></br>
      <input className='box' name='address' placeholder='Home Address' onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <div>
      <label>Email</label><br></br>
      <input className='box' name='email' placeholder='Email' type="email" onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <div>
      <label>Password</label><br></br>
      <input className='box' name='password' placeholder='Password' type='password' onChange={(e)=> setValues({...values, [e.target.name]: e.target.value})}/>
    </div>
    <br/>
    <button className='login-button'><b>Sign Up</b></button>
    <br/><hr/>
      Already A User ? <Link to='/login' className='link-click'>Sign In</Link>
  </form>
  <ToastContainer/>
  </div>
  </div>
  )
}

export default Signup