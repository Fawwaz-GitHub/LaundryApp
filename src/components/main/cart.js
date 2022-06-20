import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {laundryContext} from '../../App'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios"

function Cart() {
    let context = useContext(laundryContext)
    let [cartprice] = useState(0)
    console.log(context.cart)

    const navigate = useNavigate();

    let handleRemove = (e) => {
        context.cart.splice(context.cart.indexOf(e),1);
        context.setCartvalue(context.cart.length)
    }

  return <div className='product-wrapper'>
    {
      context.cart.length>0?<>
      <h2>You Have Listed:</h2>
    {
      context.data.map((e)=>{
          cartprice += Number(e.price) 
          return <div className='product-item-wrapper'>
              <div className='product-details'>
                  <h4>{e.name}</h4>
                  <div className='product-price'>₹{e.price}</div>
                  <button className='product-btn' onClick={()=>handleRemove(e)}>Remove</button>
              </div>
          </div>
      })
      }
      <div className='placeholder-wrapper'>
        <div className='product-price'><b>Total Price: {cartprice}</b></div>
            <PayPalScriptProvider options={{ "client-id": "AV6bfW_5qATtHCvbxTAJUDcd6EToCRGtCDPP_Y8riul3ZMwVkRy6FpQajSndXbTzKqrcExSLk1zn6-Mc" }}>
                <PayPalButtons
                    onCancel={()=>{
                        alert('Transation Successful')
                        context.setCart([])
                        context.setCartvalue(0)
                        navigate('/')
                        }}
                                />
            </PayPalScriptProvider>
        </div>
      </>
      :<h2>Your List Is Empty</h2>
  }
</div>
}

export default Cart