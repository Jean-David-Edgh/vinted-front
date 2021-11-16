import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  const location = useLocation();
  const { title, price } = location.state;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Résumé de la commande</h1>
        <ul>
          <li>Produit {title}</li>
          <li>Prix de l'article {price}€</li>
          <li>Frais protection acheteurs 0.50€</li>
          <li>Frais de port 1.00€</li>
          <li>Total {price + 1.5}€</li>
        </ul>
        <p>Il ne vous reste plus qu'un étape pour vous offrir {title}. </p>
        <p>
          Vous allez payer {price + 1.5}€ (frais de protection et frais de port
          inclus).
        </p>
      </div>
      <div className="payment-form">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
