import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";

const Payment = ({ token }) => {
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

  const location = useLocation();
  const { title, price } = location.state;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Résumé de la commande</h1>
        <ul>
          <li>
            <span className="product">Produit :</span> {title}
          </li>
          <li>
            <span className="product">Prix de l'article :</span> {price}€
          </li>
          <li>
            <span className="product">Frais protection acheteurs :</span> 0.50€
          </li>
          <li>
            <span className="product">Frais de port :</span> 1.00€
          </li>
          <li>
            <span className="product">Total :</span> {price + 1.5}€
          </li>
        </ul>
        <p>
          Il ne vous reste plus qu'un étape pour vous offrir{" "}
          <span className="bold">{title}</span>.{" "}
        </p>
        <p>
          Vous allez payer <span className="bold">{price + 1.5}€</span> (frais
          de protection et frais de port inclus).
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
