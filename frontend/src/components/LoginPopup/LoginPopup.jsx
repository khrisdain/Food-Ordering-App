import React, {useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'


const LoginPopup = ({setShowLogin}) => {

  const[currState, setCurrState] = useState("Login")

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        {/*Login pop input */}
        <div className="login-popup-inputs">
          {/*Ternary op to check for login state */}
          {currState === "Login" ? <></> : <input type="text" placeholder="Your name"  required/>}
          <input type="text" placeholder="Your email"  required/>
          <input type="text" placeholder="Your password"  required/>
        </div>
        <button>{currState === "Sign Up"?"Create account":"login"}</button>

        {/*Login popup conditions */}
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {/*Ternary op to monitor curr state for p tags below */}
        {currState === "Login" ?
          <p>Create a new account? <span onClick={() => setCurrState("SignUp")} >Click here</span></p> : 
          <p>Already have an account <span onClick={() => setCurrState("Login")} >Login</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup

//Taking a break