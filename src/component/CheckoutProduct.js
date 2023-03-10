import React from 'react'
import "./CheckoutProduct.css"  
import {UseStateValue} from './StateProvider'

function CheckoutProduct({id, image, price, title, rating, hiddenButton}) {
  const [{basket}, dispatch] = UseStateValue()
const  removeFromBasket = () =>{
  dispatch({
    type: 'Remove_from_Basket',
    id: id
  })
}
  return (
    <div className='checkoutProduct'>
        <img src={image} className="checkoutProduct_img"/>
        <div className='checkoutProduct_info'>
         <p className='checkoutProduct_title'>{title}</p>
         <p className='checkoutProduct_price'>
            <small>₹</small>
            <strong>{price}</strong>
         </p>
         <div className='checkoutProduct_rating'>
         {Array(rating).fill().map((_,i) => 
         (<p key={i} className='checkoutProduct_rating'>🌟</p>))}
         </div>
         {!hiddenButton && <button onClick={removeFromBasket}>Remove from Basket</button>}
         
        </div>
    </div>
  )
}

export default CheckoutProduct