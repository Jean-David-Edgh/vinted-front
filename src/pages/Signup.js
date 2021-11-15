import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step2, setStep2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      try {
        // faire la requete axios
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          { username, email, password }
        );
        // en fonction de la réponse
        if (response.data.token) {
          setUser(response.data.token);
          navigate("/");
        }
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 409) {
          setErrorMessage("Cet email a déjà un compte");
        }
      }
    } else {
      alert("Vos mots de passe ne sont pas identiques ! Abruti $$");
    }
  };

  return (
    <div className="signup">
      {step2 === false ? (
        <div className="signup">
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
            />
            <br />
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              type="email"
              placeholder="email"
              value={email}
            />
            <br />
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              type="password"
              placeholder="mot de passe"
              value={password}
            />
            <br />
            <input
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              type="password"
              placeholder="confirmez votre mot de passe"
              value={confirmPassword}
            />
            <br />
            <span style={{ color: "red" }}>{errorMessage}</span>
            <br />
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="subscribe"
                value="newsletter"
                id="newsletterCheck"
                className="checkbox-elem exclude"
              />
              <label for="newsletterCheck">S'inscrire à notre newsletter</label>
            </div>
            <p className="subtext">
              En m'inscrivant, je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>

            <br />
            <input
              type="submit"
              value={"S'inscrire"}
              className="submit-signup exclude"
            />
          </form>
          <Link to="/login" className="lead-signup">
            Tu as déjà un compte ? Connecte-toi !
          </Link>
        </div>
      ) : (
        setStep2(true)
      )}
    </div>
  );
};

export default Signup;
