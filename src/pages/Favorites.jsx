import "../css/Favorites.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getFavorites, removeFavorite } from "../utils/handleFavorites";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";
import { TiDelete } from "react-icons/ti";

const FavoritesPage = () => {
  const [comicsData, setComicsData] = useState([]);
  const [charactersData, setCharactersData] = useState([]);
  const navigate = useNavigate();

  // Fetch favorites on component creation
  useEffect(() => {
    const fetchFavorites = async () => {
      // Get comics
      const comicIds = getFavorites("comics");
      if (comicIds.length > 0) {
        const comicResults = await Promise.all(
          comicIds.map((id) => axios.get(`http://localhost:3000/comic/${id}`))
        );
        setComicsData(comicResults.map((res) => res.data));
      }

      // Get characters
      const charIds = getFavorites("characters");
      if (charIds.length > 0) {
        const charResults = await Promise.all(
          charIds.map((id) =>
            axios.get(`http://localhost:3000/character/${id}`)
          )
        );
        setCharactersData(charResults.map((res) => res.data));
      }
    };

    fetchFavorites();
  }, []);

  // Remove favorite
  const handleRemoveFavorite = (id, type) => {
    removeFavorite(id, type);

    if (type === "comics") {
      setComicsData((prev) =>
        prev.filter((item) => String(item._id || item.id) !== String(id))
      );
    } else {
      setCharactersData((prev) =>
        prev.filter((item) => String(item._id || item.id) !== String(id))
      );
    }
  };

  return (
    <main className="favorites-page">
      <div className="container">
        <section>
          <h2>Personnages favoris</h2>
          {charactersData.length === 0 ? (
            <p>Aucun personnage en favori</p>
          ) : (
            <div className="favorites-list">
              {charactersData.map((element) => {
                const id = element.id || element._id;
                return (
                  <div
                    key={id}
                    className="favorite-item"
                    onClick={() => {
                      navigate(`/character/${id}`);
                    }}
                  >
                    <img
                      src={getImageUrl(element.thumbnail)}
                      alt={element.name}
                    />
                    <h3>{element.name}</h3>
                    <button
                      onClick={(element) => {
                        element.stopPropagation();
                        handleRemoveFavorite(id, "characters");
                      }}
                    >
                      <TiDelete />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <section>
          <h2>Comics favoris</h2>
          {comicsData.length === 0 ? (
            <p>Aucun comic book en favori</p>
          ) : (
            <div className="favorites-list">
              {comicsData.map((element) => {
                const id = element.id || element._id;
                return (
                  <div
                    key={id}
                    className="favorite-item"
                    onClick={() => {
                      navigate(`/comic/${id}`);
                    }}
                  >
                    <img
                      src={getImageUrl(element.thumbnail)}
                      alt={element.title}
                    />
                    <h3>{element.title}</h3>
                    <button
                      onClick={(element) => {
                        element.stopPropagation();
                        handleRemoveFavorite(id, "comics");
                      }}
                    >
                      <TiDelete />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default FavoritesPage;
