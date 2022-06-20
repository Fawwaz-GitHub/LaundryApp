//importing all libraries
import React,{useState,useEffect} from 'react';
import './App.css';
import "react-toastify/dist/ReactToastify.css"
import Header from './components/header';
import Body from './components/body';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import Home from "./components/home"
import Extracart from './components/main/extracart';
import Wash from './components/main/wash';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import axios from 'axios';

//exporting context instead of props 
export const laundryContext = React.createContext();

//acquiring laundry items via url 
  const url = "https://laundryfoundryproductjson.herokuapp.com/users/display" 

function App() {

  let [data, setData] = useState([])
  let [cart, setCart] = useState([])
  let [cartvalue, setCartvalue] = useState(cart.length)

  useEffect(()=>{
    getData();
  },[])

  let getData = async() => {
    let res = await axios.get(url);
    setData(res.data)
  }
  
  return (
  <BrowserRouter>
  <laundryContext.Provider value={{data,cart,setCart,cartvalue,setCartvalue}}>
  <Header/>
  <div className='app-wrapper'>
  <Routes>
    <Route path='/' element={<Body/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/home' element={<Home/>}>
      <Route path='wash' element={<Wash/>}/>
      <Route path='cart' element={<Extracart/>}/>
    </Route>
  </Routes>
  </div>
  <Footer/>
  </laundryContext.Provider>
  </BrowserRouter>
  )
}

export default App;
