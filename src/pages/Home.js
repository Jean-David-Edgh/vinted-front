import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import vintedHero from "../images/vinted-hero.jpg";
import effetDechire from "../images/effet-dechire.png";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="body">
      <div className="hero-section">
        <div className="home-cta">
          <p className="hero-text">Prêts à faire du tri dans vos placards ?</p>
          {/* <button className="submit exclude">Commencez à vendre</button> */}
          <Link to="/publish" className="submit-hero">
            Commencez à vendre
          </Link>
        </div>
        <img src={vintedHero} alt="fond Vinted" className="hero-img" />
        <img src={effetDechire} alt="effet déchiré" className="effet-hero" />
      </div>

      <div className="home">
        {data.offers.map((offer) => {
          return (
            <Link key={offer._id} to={`/offer/${offer._id}`}>
              <h3>{offer.product_name}</h3>
              <img
                src={offer.product_image.secure_url}
                alt={offer.product_name}
              />
              <ul className="offer-desc-home">
                <li>{offer.product_price}€</li>
                {offer.product_details.map((elem, index) => {
                  const keys = Object.keys(elem);
                  return (
                    <li key={index}>
                      <span>{elem[keys[0]]}</span>
                    </li>
                  );
                })}
              </ul>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
