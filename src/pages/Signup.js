import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step2, setStep2] = useState(false);
  const [cookie, setCookie] = useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setStep2(true);
      const token = "azertyuiop";
      Cookies.set("myToken", token, { expires: 30 });
      navigate("/");
    } else {
      alert("Vos mots de passe ne sont pas identiques ! Débilos $$");
    }
  };

  return (
    <div className="signup">
      <h1>S'inscrire</h1>
      {step2 === false && (
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
      )}
    </div>
  );
};

export default Signup;
