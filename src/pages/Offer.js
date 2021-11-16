import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="offers-container">
      <div className="offers">
        <img src={data.product_image.secure_url} alt="" />
        <ul className="offer-desc">
          <p className="price-item">{data.product_price}€</p>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <li key={index} className="prop-desc">
                <span className="prop">{keys[0]}</span>
                <span className="prop-item">{elem[keys[0]]}</span>
              </li>
            );
          })}
          <li>{data.product_name}</li>
          <li>{data.product_description}</li>
          <li>{data.owner.account.username}</li>
          <li>
            {/* <form>
              <input
                type="submit"
                className="submit exclude"
                value={"Acheter"}
              />
            </form> */}
            <button
              className="submit exclude"
              // onClick={() => {
              //   // navigate("/payment");
              //   <Link key={data._id} to={`/payment/${data._id}`}></Link>;
              // }}
              onClick={() => {
                navigate("/payment/");
              }}
            >
              Acheter
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Offer;
