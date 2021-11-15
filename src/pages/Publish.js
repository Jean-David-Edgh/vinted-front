import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [data, setData] = useState();

  //   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On doit joindre à la requête :
      // - title et file
      // - un Bearer Token
      const formData = new FormData();
      // ajouter des paires clé/valeur
      formData.append("title", title);
      formData.append("picture", file);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
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
          <form onSubmit={handleSubmit}>
            <input
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Nom de l'article"
            />
            <br />
            <input
              // multiple={true}
              onChange={(event) => setFile(event.target.files[0])}
              type="file"
            />
            <br />
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
        // <p>coucou ?</p>
      )}
    </div>
  );
};

export default Publish;
