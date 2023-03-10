import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format';
import { UseStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from "react-router-dom";
function Subtotal() {
  const [{basket}, dispatch] = UseStateValue()
  const navigate = useNavigate();
  return (
    <div className='subtotal'>
        <CurrencyFormat
        renderText={(value) => (
            <>
            <p>Subtotal ({basket?.length} items): <strong>{value}</strong></p>
          <small className='subtotal_gift'>
         <input type="checkbox" />
          This order contains a gift
          </small>
            </>
           
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeperator={true}
        prefix={"₹"}
        />
        <button onClick={e => navigate('/payment')}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal