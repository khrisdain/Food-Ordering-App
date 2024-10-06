import React from 'react'
import "./Add.css";
import { assets } from '../../assets/assets';

const Add = () => {
  return (
    <div className='add'>
      <form action="flex-col">
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" id="image" hidden required />
        </div>

        <div className="add-product-name flex-col"></div>
      </form>
    </div>
  )
}

export default Add;
