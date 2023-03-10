import React from 'react'
import "./Product.css"
import { UseStateValue } from './StateProvider'

function Product({id,title, image, price, rating}) {

   const [{basket}, dispatch]  = UseStateValue();
   // console.log(basket)

   const addToBasket = () =>{
     dispatch({
      type: "Add_to_Basket",
      item: {
         id: id,
         title: title,
         image: image,
         price: price,
         rating: rating
      }
     })
   }
  return (
    <div className='product_box'>
        <div className='product_info'>
        <p className='product_title'>{title}</p>
     <p className='product_price'>
        <small>₹</small>
        <strong>{price}</strong>
     </p>
     <div className='product_rating'>
        {Array(rating).fill().map((_,i) =>{
            <p>🌟</p>
        
        })}
     </div>
        </div>
        <img className='product_image' src={image} alt="my"/>
     <button className='product_btn' onClick={addToBasket} >Add to basket</button>
    </div>
  )
}

export default Product;