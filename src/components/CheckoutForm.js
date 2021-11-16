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
      // Etape 1 : envoyer les données de CardElement à l'API Stripe
      // Récupérer les données rentrées dans CardElement
      const cardElements = element.getElement(CardElement);
      // Envoyer à l'API Stripe
      const stripeResponse = await stripe.createToken(cardElements, {
        // name: { userId },
      });
      // Etape 2 : envoyer le stripeToken à mon serveur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          productPrice: 20,
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setValid("Paiement validé ! Félicitations !");
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
