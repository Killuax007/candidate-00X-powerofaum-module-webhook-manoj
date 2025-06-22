# Stripe Webhook Listener – PowerOfAum (Module D)

This project implements **Module D: Stripe Webhook Listener** for the PowerOfAum backend system. It is built with **Node.js** and **Express**, and is deployed on Vercel.

---

## 🔗 Live Deployment

👉 [View Live](https://powerofaum-module-webhook-manoj.onrender.com/)

---

## 📌 Endpoint Specification

### `POST /api/webhook`

This endpoint handles Stripe webhook events and verifies the request using Stripe's signature.

#### Supported Events:
- `checkout.session.completed` → Updates user status to `active`
- `invoice.payment_failed` → Updates user status to `past_due`

### `GET /` (Optional for testing)

Returns a simple message indicating the webhook listener is live.

---

## 🔐 Environment Variables

Make sure to set the following environment variables in your deployment platform:

| Variable               | Description                        |
|------------------------|------------------------------------|
| `STRIPE_SECRET_KEY`    | Your Stripe secret key (test/live) |
| `STRIPE_WEBHOOK_SECRET`| Webhook signing secret from Stripe |

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- Stripe SDK
- Axios (for external PATCH requests)
- Deployed on Vercel

---

## 📥 How to Run Locally

```bash
git clone https://github.com/Killuax007/candidate-00X-powerofaum-module-webhook-manoj/git
cd candidate-00-x-powerofaum-module-we
npm install
cp .env.sample .env # Then fill in your keys
node server.js
```

