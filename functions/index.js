const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51MgifQSDdyEeXiFBhLSFuaOhCP3Wz4gfjHTgG779WiWRur9F87VJ9s30Aq3puuPP3vUc4TWDY3jzMfXFnAN43xJm00dJqKHKz6",
);
// API
// API config
const app = express();
app.use(cors({origin: true}));
app.use(express.json());
// midlewares
app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received For this amount>>>", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  });
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// API routes
// Listen - command
exports.api = functions.https.onRequest(app);
