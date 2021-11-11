import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      ); // en fonction de la réponse
      if (
        response.data.password === { password } ||
        response.data.email === { email }
      ) {
        Cookies.set("myToken", response.data.token, { expires: 30 });
        navigate("/");
      } else alert("mauvais compte ou mot de passe");
    } catch (error) {
      console.log(error.message);
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
        <input type="submit" />
      </form>
      <p>Pas encore de compte ? Inscris-toi !</p>
    </div>
  );
};

export default Login;
