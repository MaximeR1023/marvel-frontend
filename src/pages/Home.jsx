import "../css/ListPage.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [localPage, setLocalPage] = useState(0);
  const navigate = useNavigate();
  const totalPages = data ? Math.ceil(data.count / 100) : 0;

  // Collecting list of characters from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--sw2wxzy5rpkz.code.run/characters?&name=${search}&skip=${
            page * 100
          }`
        );
        setData(response.data);
        console.log(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, page]);

  // Debounce search inputs
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(localPage);
    }, 300);

    return () => clearTimeout(timer);
  }, [localPage]);

  // Set result page back to zero if search input changes
  useEffect(() => {
    setLocalPage(0);
    setPage(0);
  }, [search]);

  return isLoading ? (
    <div className="container">
      <span>En cours de chargement...</span>
    </div>
  ) : (
    <main>
      <div className="container">
        <article className="list">
          {data.results.map((character) => {
            return (
              <section
                onClick={() => {
                  navigate(`/character/${character._id}`, {
                    state: character._id,
                  });
                }}
                className="thumb"
                key={character._id}
              >
                <img src={getImageUrl(character.thumbnail)} alt="" />
                <section className="character-info">
                  <p>{character.name}</p>
                  <p>{character.description}</p>
                </section>
              </section>
            );
          })}
        </article>
        <div className="search-pagination">
          <button
            disabled={localPage === 0}
            onClick={() => setLocalPage(localPage - 1)}
          >
            <BiSolidLeftArrow /> Précédent
          </button>

          <span>
            Page {page + 1} / {totalPages}
          </span>

          <input
            type="number"
            min={1}
            max={totalPages}
            value={localPage + 1}
            onChange={(element) => {
              const inputValue = Number(element.target.value);
              if (inputValue >= 1 && inputValue <= totalPages) {
                setLocalPage(inputValue - 1);
              }
            }}
          />

          <button
            disabled={localPage + 1 >= totalPages}
            onClick={() => setLocalPage(localPage + 1)}
          >
            Suivant <BiSolidRightArrow />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
