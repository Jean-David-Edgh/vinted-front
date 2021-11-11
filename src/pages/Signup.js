import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step2, setStep2] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // faire la requete axios
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          { username: username, email: email, password: password }
        ); // en fonction de la réponse
        if (response.data.token) {
          Cookies.set("myToken", response.data.token, { expires: 30 });
          navigate("/");
        } else alert("erreur");
      } catch (error) {
        console.log(error.message);
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
          <input type="submit" />
        </form>
      ) : (
        setStep2(true)
      )}
    </div>
  );
};

export default Signup;
