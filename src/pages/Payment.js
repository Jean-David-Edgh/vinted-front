import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51IDAEzFZKNlQ2lhfVn7gU3iqhbzYEt71pcoWC5bos331Y7xn7M2c5TXGlJzU9BV6QKRuh0ageQ9jhgvOfSDfcHcV00yINi8oy8"
  );

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Résumé de la commande</h1>
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
