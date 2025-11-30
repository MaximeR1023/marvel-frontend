import "../css/ListPage.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";

const Comics = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [localPage, setLocalPage] = useState(0);
  const totalPages = data ? Math.ceil(data.count / 100) : 0;

  // Collecting list of comics from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?title=${search}&skip=${page * 100}`
        );
        // console.log(response.data);
        setData(response.data);
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
          {data.results.map((element) => (
            <section
              onClick={() => {
                navigate(`/comic/${element._id}`, {
                  state: element._id,
                });
              }}
              className="thumb comic-thumb"
              key={element._id}
            >
              <img src={getImageUrl(element.thumbnail)} alt="" />
              <h2>{element.title}</h2>
              <p>{element.description}</p>
            </section>
          ))}
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

export default Comics;
