import vintedLogo from "../images/vinted_logo.png";

const Header = () => {
  return (
    <div className="header">
      <img src={vintedLogo} alt="logo Vinted" />
      <div className="menu">
        <button>S'inscrire</button>
        <button>Se connecter</button>
        <button>Vends tes articles</button>
        <button>Se déconnecter</button>
      </div>
    </div>
  );
};

export default Header;
