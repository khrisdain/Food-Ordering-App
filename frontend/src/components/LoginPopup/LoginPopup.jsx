import React, {useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'


const LoginPopup = ({setShowLogin}) => {

  const[currState, setCurrState] = useState("Sign Up")

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        {/*Login pop input */}
        <div className="login-popup-inputs">
          <input type="text" placeholder="Your name"  required/>
          <input type="text" placeholder="Your email"  required/>
          <input type="text" placeholder="Your password"  required/>
        </div>
      </form>
    </div>
  )
}

export default LoginPopup

//Taking a break