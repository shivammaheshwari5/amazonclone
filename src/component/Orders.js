import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import './Orders.css'
import { UseStateValue } from './StateProvider';
import Order from './Order';
function Orders() {
const [orders, setOrders] = useState([]);
const [{basket, user}, dispatch] = UseStateValue();

useEffect(() => {
  if(user){
    db
    .collection('users')
    .doc(user?.uid)
    .collection('orders')
    .orderBy('created', 'desc')
    .onSnapshot(snapshot => (
      setOrders(snapshot.docs.map(doc =>({
        id: doc.id,
        data: doc.data()
      })))
    ))
  }
  else{
    setOrders([])
  }

},[user])
  return (
    <div className='orders'>
      <h1>Your Order</h1>
      <div className='orders_container'>
       {orders?.map((order,i) => (
          <Order key={i} order={order}/>
       ))}
      </div>
    </div>
  )
}

export default Orders;