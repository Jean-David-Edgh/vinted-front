import vintedLogo from "../images/vinted_logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img src={vintedLogo} alt="logo Vinted" />

      {token ? (
        <button
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <>
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </>
      )}
    </div>
  );
};

export default Header;
