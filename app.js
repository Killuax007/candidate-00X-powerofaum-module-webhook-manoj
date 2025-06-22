require("dotenv").config();
const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.raw({ type: "application/json" }));

app.post("/api/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("✅ Parsed Event:", event.type);

  const session = event.data.object;
  const userId = session.metadata?.user_id;

  if (!userId) {
    console.warn("User ID missing in metadata.");
    return res.status(400).send("User ID not found in metadata.");
  }

  let url = `https://your-api-domain.com/api/user/${userId}`;
  let data;

  if (event.type === "checkout.session.completed") {
    data = { status: "active" };
  } else if (event.type === "invoice.payment_failed") {
    data = { status: "past_due" };
  } else {
    return res.status(200).send("Event not handled.");
  }

  axios
    .patch(url, data)
    .then((response) => console.log("✅ User status updated:", response.data))
    .catch((err) =>
      console.error("❌ Failed to update user status:", err.message)
    );

  res.status(200).send("Webhook received.");
});

app.listen(process.env.PORT, () => {
  console.log("server running on port 5000");
});
