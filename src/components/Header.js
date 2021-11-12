import vintedLogo from "../images/vinted_logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <img src={vintedLogo} alt="logo Vinted" />

      <nav>
        <Link to="/" className="nav-elem">
          Aller à l'accueil
        </Link>
        {token ? (
          <button
            className="nav-elem"
            onClick={() => {
              setUser(null);
              navigate("/");
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup" className="nav-elem">
              S'inscrire
            </Link>
            <Link to="/login" className="nav-elem">
              Se connecter
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
