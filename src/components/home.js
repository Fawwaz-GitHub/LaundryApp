import React,{useContext, useEffect} from 'react'
import { Link, Outlet, useNavigate} from 'react-router-dom'
import {laundryContext} from '../App'
import {useCookies} from "react-cookie"
import axios from "axios"

function Home() {
    let context = useContext(laundryContext)

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookies] = useCookies([]);
    useEffect(()=> {
      const verifyUser = async () => {
        if (!cookies.jwt) {
          navigate("/login");
        }
        else {
          const { data } = await axios.post(
            "http://localhost:4000/home",
            {},
            { withCredentials: true }
          );
          if (!data.status) {
            removeCookies("jwt");
            navigate("/login");
          }
        }
      };
      verifyUser();
    },[cookies, navigate]);

    const logOut = () => {
        removeCookies("jwt")
        navigate('/login')
      }

  return <>
    <div className='fullhome'>
        <div className='leftsidehome'>
            <div className='topsidehome'>
                <br/>
                <Link to='wash' className='homelink'><h4>SCHEDULE WASH</h4></Link><br/>
                <Link to='cart' className='homelink'><h4>MY ORDERS</h4><span className='count'><h4></h4></span></Link>
            </div>
            <div className='bottomsidehome'>
              <div to='account' className='homelink'><h4 onClick={logOut}>LOG OUT</h4><br/></div>
            </div>
        </div>
        <Outlet/>
    </div>
    </>
}

export default Home