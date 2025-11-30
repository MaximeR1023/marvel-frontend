import "../css/ProfilePage.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
  getFavorites,
} from "../utils/handleFavorites";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Character = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Acquiring character sheet from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        const response2 = await axios.get(`http://localhost:3000/comics/${id}`);
        setData2(response2.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  // Refresh page between favorite toggles
  useEffect(() => {
    setFavorite(isFavorite(id, "characters"));
  }, [id]);

  // Toggle between both favorite states
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(id, "characters");
    } else {
      addFavorite(id, "characters");
    }
    setFavorite(!favorite);
  };

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
            <h1>{data.name}</h1>
            {data.description ? (
              <p>{data.description}</p>
            ) : (
              <p className="no-desc">
                Ce personnage est trop cool pour être présenté
              </p>
            )}
            <button
              className="character-favorite"
              onClick={handleToggleFavorite}
            >
              {isFavorite(id, "characters") ? <FaStar /> : <FaRegStar />}
            </button>
          </div>
        </section>
        <h2>Comics</h2>
        <section className="related-comics-list">
          {data2.comics.length === 0 ? (
            <p className="no-comic">
              Aucun comic book trouvé pour ce personnage
            </p>
          ) : (
            data2.comics.map((element) => (
              <article
                onClick={() => {
                  navigate(`/comic/${element._id}`);
                }}
                className="related-comic"
                key={element._id}
              >
                <h3>{element.title}</h3>
                <p>{element.description}</p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default Character;
