import React from 'react'
import "./PlaceOrder.css"

const PlaceOrder = () => {
  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi field">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name'/>
        </div>

        <div className="multi-fields">
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder='Street' />
        </div>

        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State'/>
        </div>

        <div className="multi-fields">
          <input type="text" placeholder='Zip Code' />
          <input type="text" placeholder='Country' />
        </div>
      </div>

      <div className='place-order-right'>

      </div>
    </form>
  )
}

export default PlaceOrder
