import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email, password }
      );
      // en fonction de la réponse
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("mauvais compte ou mauvais mot de passe !");
      } else console.log(error.message);
    }
  };

  return (
    <div className="login">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
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
        <span style={{ color: "red" }}>{errorMessage}</span>
        <br />
        <input type="submit" className="submit exclude" />
      </form>
      <Link to="/signup" className="lead">
        Pas encore de compte ? Inscris-toi !
      </Link>
    </div>
  );
};

export default Login;
