import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,      // ✅ fixed
  key_secret: process.env.RAZORPAY_SECRET // ✅ fixed
});

export default razorpayInstance;