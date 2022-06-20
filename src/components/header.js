import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div className='header-wrapper'>
        <h1 className='header-name'>Laundry Foundry</h1>
        <Link to='/'><button className='header-btn'>About</button></Link>
    </div>
  )
}

export default Header