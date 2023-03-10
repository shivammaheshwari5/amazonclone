import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { getBasketTotal } from "./component/reducer";
import { UseStateValue } from "./component/StateProvider";
import CheckoutProduct from "./component/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./firebase";
function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = UseStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const onhandleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "Empty_basket",
        });
        navigate("/orders");
      });
  };
  const onhandleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("The secret is >>", clientSecret);
  return (
    <div className="payment">
      <div className="payment_itemCount">
        <h1>
          Checkout <Link to="/checkout">({basket?.length} item)</Link>
        </h1>
      </div>
      <div className="payment_section">
        <div className="payment_title">
          <h3>Delivery Address</h3>
        </div>
        <div className="Payment_address">
          <p>{user?.email}</p>
          <p>Ashok Nagar Kasganj</p>
          <p>Uttar Pradesh</p>
        </div>
      </div>
      <div className="payment_section">
        <div className="payment_title">
          <h3>Review item and delivery</h3>
        </div>
        <div className="payment_item">
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
      <div className="payment_section">
        <div className="payment_detail">
          <h3>Payment Method</h3>
        </div>
        <div className="payment_details">
          <form onSubmit={onhandleSubmit}>
            <CardElement onChange={onhandleChange} />
            <div className="priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType="text"
                thousandSeperator={true}
                prefix={"₹"}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
