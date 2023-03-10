import React from 'react'
import './Order.css'
import CheckoutProduct from './CheckoutProduct'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
function Order({order}) {
  return (
    <div className='Order'>
     <h3>Order</h3>
     <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
     <p className='order_id'>
        <small>{order.id}</small>
     </p>
     {order.data.basket?.map((item,i) => (
         <CheckoutProduct 
              key={i}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hiddenButton
            />
     ))}
     <CurrencyFormat
        renderText={(value) => (
            <h3>Order Total: {value}</h3>
          )}
        decimalScale={2}
        value={order.data.amount/100}
        displayType="text"
        thousandSeperator={true}
        prefix={"₹"}
        />
    </div>
  )
}

export default Order