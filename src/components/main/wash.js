import React,{useContext,useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom";
import {laundryContext} from '../../App';
import axios from "axios"

function Wash() {

let context = useContext(laundryContext);
let [products,setProducts] = useState([]);
let navigate = useNavigate();

let getData = () => {
    if(context.data.length>0)
    {
        setProducts(context.data)
    }
    else
    {
        navigate('/home/wash')
    }
}

useEffect(()=>{
    getData();
},[])

return <div className='product-wrapper'>
<h2 className='product-header'>Laundry Services</h2>
{
    products.map((e,i)=>{
        return <div className='product-item-wrapper' key={i}>
            <div className='product-details'>
                <h4>{e.name}</h4>
                <div className='product-price'>₹{e.price}</div>
                <button className='product-btn' onClick={()=>{
                        axios.post('http://localhost:8000/home/wash',{name:e.name,price:e.price})
                        .then((res)=>res.data)
                }}>Add</button>
            </div>
        </div>
    })
}
</div>

}

export default Wash