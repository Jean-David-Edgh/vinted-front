import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState();
  const [data, setData] = useState();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("picture", file);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {token ? (
        <div className="publish">
          <h1>Vends ton article</h1>
          <input
            // multiple={true} : si besoin de plusieurs photos
            onChange={(event) => setFile(event.target.files[0])}
            type="file"
          />
          <br />
          <form onSubmit={handleSubmit}>
            <input
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Nom de l'article (ex. : Chemise Sézane verte)"
            />
            <br />
            <input
              onChange={(event) => setDescription(event.target.value)}
              type="text"
              placeholder="ex. : porté quelquefois, taille correctement"
            />
            <br />
            <input
              onChange={(event) => setBrand(event.target.value)}
              type="text"
              placeholder="ex. : Zara"
            />
            <br />
            <input
              onChange={(event) => setSize(event.target.value)}
              type="text"
              placeholder="ex. : L / 40 / 12"
            />
            <br />
            <input
              onChange={(event) => setColor(event.target.value)}
              type="text"
              placeholder="ex. : Fushia"
            />
            <br />
            <input
              onChange={(event) => setCondition(event.target.value)}
              type="text"
              placeholder="ex. : Neuf avec étiquette"
            />
            <br />
            <input
              onChange={(event) => setCity(event.target.value)}
              type="text"
              placeholder="ex. : Paris"
            />
            <br />
            <input
              onChange={(event) => setPrice(event.target.value)}
              type="text"
              placeholder="0,00 €"
            />

            <input
              type="submit"
              className="submit-publish exclude"
              value={"Ajouter"}
            />
          </form>
          {data && <img src={data.secure_url} alt="" />}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Publish;
