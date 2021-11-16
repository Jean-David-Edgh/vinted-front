import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const element = useElements();

  const [valid, setValid] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const cardElements = element.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElements, {
        // name: { userId },
      });
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          // productPrice: { product_price },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setValid("Paiement validé ! Félicitations !!!!!!!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <input type="submit" />
      <span>{valid}</span>
    </form>
  );
};

export default CheckoutForm;
