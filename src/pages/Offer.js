import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
        {/* <h3>{data.product_name}</h3> */}
        <img src={data.product_image.secure_url} alt="" />
        <ul className="offer-desc">
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <li key={index}>
                <span>{keys[0]}</span>
                <span>{elem[keys[0]]}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Offer;
