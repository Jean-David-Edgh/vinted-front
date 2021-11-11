import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <form></form>
      <p>Pas encore de compte ? Inscris-toi !</p>
    </div>
  );
};

export default Login;
