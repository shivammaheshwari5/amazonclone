import "./App.css";
import Header from "./component/Header";
import Home from "./component/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./component/Checkout";
import Login from "./component/Login";
import { useEffect } from "react";
import { UseStateValue } from "./component/StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./component/Orders";

function App() {
  const [{}, dispatch] = UseStateValue();
  const promise = loadStripe(
    "pk_test_51MgifQSDdyEeXiFBqCmSLzrCkphTxK74y9VnIxJOX5U3Djq1eI20USfj3gaqU2Y1SHNNTrtWUVslnnuiJePOvy2W00gup2ngE9"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={[<Header key={1} />, <Home key={2} />]}
        ></Route>
        <Route
          path="/checkout"
          element={[<Header key={3} />, <Checkout key={4} />]}
        ></Route>
        <Route
          path="/payment"
          element={[
            <Header key={5} />,
            <Elements key={6} stripe={promise}>
              <Payment key={7} />
            </Elements>,
          ]}
        ></Route>
        <Route path="/login" element={<Login key={8} />}></Route>
        <Route
          path="/orders"
          element={[<Header key={9} />, <Orders key={10} />]}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
