import axios from "axios";

export const startPayment = async ({ email, planName }) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
    { email, planName }
  );

  return new Promise((resolve) => {
    const options = {
      key: data.key,
      amount: data.amount * 100,
      currency: "INR",
      name: "Ring Ring CRM",
      order_id: data.orderId,
      prefill: { email },

      handler: async function (response) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            email,
            planName,
          }
        );

        resolve(true);
      },
    };

    new window.Razorpay(options).open();
  });
};
