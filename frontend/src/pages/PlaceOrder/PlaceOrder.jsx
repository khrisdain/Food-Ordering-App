import React, {useContext, useState}from 'react'
import "./PlaceOrder.css"
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount, token, food_list, cartItem, url} = useContext(StoreContext)

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault(); // Prevent page reload on submit
    let orderItems = [];
    food_list.map((item) => { //iterate through the object and add the iterations one by one in item 
        if (cartItem[item._id] > 0) { // Check cart for product ID quantity
            let itemInfo = { ...item}; // Copy item object to avoid modifying the original
            itemInfo["quantity"] = cartItem[item._id]; // Add quantity to item
            orderItems.push(itemInfo);
        }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(
      url+"/api/order/place",
      orderData,
      {headers: {token}}
    )
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url)
    }
    else {
      alert("Error")
    }
};



  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.firstName} name='firstName' type="text" placeholder='First Name' />
          <input onChange={onChangeHandler} value={data.lastName} name='lastName' type="text" placeholder='Last Name'/>
        </div>

        <input onChange={onChangeHandler} value={data.email} name='email' type="email" placeholder="Email Address" />
        <input onChange={onChangeHandler} value={data.street} name='street' type="text" placeholder='Street' />

        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.city} name='city' type="text" placeholder='City' />
          <input onChange={onChangeHandler} value={data.state} name='state' type="text" placeholder='State'/>
        </div>

        <div className="multi-fields">
          <input onChange={onChangeHandler} value={data.zipcode} name='zipcode' type="text" placeholder='Zip Code' />
          <input onChange={onChangeHandler} value={data.country} name='country' type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} value={data.phone} name='phone' type="text" placeholder='Phone Number' />
      </div>

      <div className='place-order-right'>
      <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr/>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0?0: getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
