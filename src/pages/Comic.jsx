import "../css/ProfilePage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
  getFavorites,
} from "../utils/handleFavorites";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Comic = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const comicsFavorites = getFavorites("comics");
  // console.log(comicsFavorites);

  // Refresh page between favorite toggles
  useEffect(() => {
    setFavorite(isFavorite(id, "comics"));
  }, [id]);

  // Toggle between both favorite states
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(id, "comics");
    } else {
      addFavorite(id, "comics");
    }
    setFavorite(!favorite);
  };

  // Acquiring character sheet from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comic/${id}`);
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="container">
      <span>En cours de chargement...</span>
    </div>
  ) : (
    <main>
      <div className="container">
        <section className="pres">
          <img src={getImageUrl(data.thumbnail)} alt="" />
          <div className="pres-right">
            <h1>{data.title}</h1>
            {data.description ? (
              <p>{data.description}</p>
            ) : (
              <p className="no-desc">Pas de description disponible</p>
            )}
          </div>
          <button className="comic-favorite" onClick={handleToggleFavorite}>
            {isFavorite(id, "comics") ? <FaStar /> : <FaRegStar />}
          </button>
        </section>
      </div>
    </main>
  );
};

export default Comic;
