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
        name: "L'id de l'acheteur",
      });

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: "Titre",
          amount: 10,
        }
      );

      if (response.status === 200) {
        setValid("Paiement validé ! Merci !");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!valid ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <input type="submit" />
          <span>{valid}</span>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
