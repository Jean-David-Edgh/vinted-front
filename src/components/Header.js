import logoVinted from "../images/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();

  // const [filters, setFilters] = useState("");

  // const searchResults = (event) => {
  //   let newResults = [];
  //   for (let i = 0; i < tableaudesoffres.length; i++) {
  //     if (
  //       tableaudesoffres[i].keywords.indexOf(event.target.value.toLowerCase()) !== -1
  //     ) {
  //       if (newResults.length >= 20) {
  //         break;
  //       } else {
  //         newResults.push(tableaudesoffres[i]);
  //       }
  //     }
  //   }
  //   setResults(newResults);
  // };

  return (
    <div>
      <div className="header">
        <img onClick={() => navigate("/")} src={logoVinted} alt="logo Vinted" />

        {/* <FontAwesomeIcon icon="search" /> */}
        <input
          type="text"
          placeholder="Recherche des articles"
          className="search"
        />
        <nav>
          {token ? (
            <div>
              <button
                className="nav-disc"
                onClick={() => {
                  setUser(null);
                  navigate("/");
                }}
              >
                Se déconnecter
              </button>{" "}
              <Link to="/publish" className="sell-elem">
                Vends tes articles
              </Link>
            </div>
          ) : (
            <>
              <Link to="/signup" className="nav-elem">
                S'inscrire
              </Link>
              <Link to="/login" className="nav-elem">
                Se connecter
              </Link>
              <Link to="/publish" className="sell-elem">
                Vends tes articles
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
