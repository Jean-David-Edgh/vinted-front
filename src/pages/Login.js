import { useState } from "react";
// import Cookies from "js-cookie";
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
        // Cookies.set("myToken", response.data.token, { expires: 30 });
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
          placeholder="password"
          value={password}
        />
        <br />
        <span style={{ color: "red" }}>{errorMessage}</span>
        <br />
        <input type="submit" />
      </form>
      <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
    </div>
  );
};

export default Login;
