import React,{useEffect,useState} from 'react'
import axios from "axios"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Extracart() {

    const [fetchData, setfetchData] = useState([])
    let [cartprice] = useState(0)

    useEffect (()=>{
        axios.get('http://localhost:8000/home/cart')
        .then((res)=>{
            setfetchData(res.data)
        })
    }, [])

    const getData = () => {
        axios.get('http://localhost:8000/home/cart')
        .then((res) => setfetchData(res.data))
    }

    const onDelete = (id) => {
        axios.delete(`http://localhost:8000/home/cart/${id}`)
        .then(()=>{
            getData();
        });
    };

    return <div className='product-wrapper'>
    <h2 className='product-header'>Your Cart</h2>
    {
        fetchData.map((e,i)=>{
            cartprice += Number(e.price)
            return <div className='product-item-wrapper' key={i}>
                <div className='product-details'>
                    <h4>{e.name}</h4>
                    <div className='product-price'>₹{e.price}</div>
                    <button className='product-btn' onClick={() => onDelete(e._id)}>delete</button>
                </div>
            </div>
        })
    }
          <div className='placeholder-wrapper'>
        <div className='product-price'><b>Total Price: {cartprice}</b></div>
            <PayPalScriptProvider options={{ "client-id": "AV6bfW_5qATtHCvbxTAJUDcd6EToCRGtCDPP_Y8riul3ZMwVkRy6FpQajSndXbTzKqrcExSLk1zn6-Mc" }}>
                <PayPalButtons/>
            </PayPalScriptProvider>        
        </div>
    </div>
}

export default Extracart