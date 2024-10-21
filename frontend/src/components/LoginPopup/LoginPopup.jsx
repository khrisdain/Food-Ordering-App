import React, {useContext, useState} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from "axios";
import { StoreContext } from '../../context/StoreContext'


const LoginPopup = ({setShowLogin}) => {
  const {url, setToken} = useContext(StoreContext)

  const[currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data, [name]:value})) //spread operator helps retain previous state and change only one field **in this case name of the input form**
  }

  const onLogin = async(event) => { //Link with form tag
    event.preventDefault();
    let newUrl = url; //reuseable copy of the backend url
    if(currState === "Login") {
      newUrl += "/api/user/login"
    }else {
     newUrl += "/api/user/register" 
    }

    const response = await axios.post(newUrl, data)

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token) //localstorage API
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        {/*Login pop input */}
        <div className="login-popup-inputs">
          {/*Ternary op to check for login state */}
          {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name"  required/>}
          <input name="email" onChange={onChangeHandler} value={data.email} type="text" placeholder="Your email"  required/>
          <input name="password" onChange={onChangeHandler} value={data.password} type="text" placeholder="Your password"  required/>
        </div>
        <button type='submit'>{currState === "Sign Up"?"Create account":"login"}</button>

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