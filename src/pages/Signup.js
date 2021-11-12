import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <h1>S'inscrire</h1>
      {step2 === false ? (
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
            placeholder="password"
            value={password}
          />
          <br />
          <input
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            type="password"
            placeholder="confirm your password"
            value={confirmPassword}
          />
          <br />
          <span style={{ color: "red" }}>{errorMessage}</span>
          <br />
          <input type="submit" />
        </form>
      ) : (
        setStep2(true)
      )}
    </div>
  );
};

export default Signup;
