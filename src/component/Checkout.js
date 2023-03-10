import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { UseStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
function Checkout({}) {
  const [{ basket }, dispatch] = UseStateValue();
  console.log(basket)
  return (
    <div className="checkout_main">
      <div className="checkout">
        <div className="checkout_left">
          <img
            className="page_image"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="img"/>
          <div className="subtotal_title"> 
            <h1 style={{fontSize: "25px"}}>Your shopping Basket</h1>

            {basket.map((item, i) => (
            <CheckoutProduct 
              key={i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
          
          </div>
        </div>
        <div className="checkout_right">
          <Subtotal />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
