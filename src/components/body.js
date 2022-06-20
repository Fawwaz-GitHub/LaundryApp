import React from 'react'
import {Link} from 'react-router-dom'

function Body() {

  var firstimage = require('./images/firstimage.jpg')

  return <div className='main-wrapper'>
    <div className='description'>
        <div className='desc1'><b>We delivers the quickest, easiest to use, and most reliable professional laundry and dry cleaning service that completely adjusts to your needs.</b></div><br></br>
        <div className='desc2'>Our laundry cleaning service gives you time back for the things you enjoy. Fill your Wash and Fold Laundry bag with pants, shorts, shirts, socks, and more. We'll clean your clothes and return your folded laundry ready to be placed in the drawer!</div><br></br>
        <div className='body-buttons'>
        <Link to='/signup'><button className='header-btn logout-btn'>Sign Up</button></Link>
        <Link to='/home'><button className='header-btn logout-btn'>Order A Wash</button></Link><br/>
        </div>
    </div>
        <img className='desc-image' src={firstimage} alt='image'/>
    </div>
}

export default Body