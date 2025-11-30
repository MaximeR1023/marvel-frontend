import "../css/Header.css";
import logo from "../assets/logo.png";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 300);

    return () => clearTimeout(timer); // cancel si l’utilisateur retape avant 300ms
  }, [localSearch]);

  return (
    <header>
      <div className="container">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          alt=""
        />
        <menu>
          <button
            onClick={() => {
              setLocalSearch("");
              setSearch("");
              navigate("/");
            }}
          >
            Personnages
          </button>
          <button
            onClick={() => {
              setLocalSearch("");
              setSearch("");
              navigate("/comics");
            }}
          >
            Comics
          </button>
          <button
            onClick={() => {
              navigate("/favorites");
            }}
          >
            Favoris
          </button>
        </menu>
        {(location.pathname === "/" || location.pathname === "/comics") && (
          <article className="search">
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                value={localSearch}
                placeholder="Chercher un personnage ou un comic book"
                onChange={(event) => {
                  setLocalSearch(event.target.value);
                }}
              />
            </label>
          </article>
        )}
      </div>
    </header>
  );
};

export default Header;
