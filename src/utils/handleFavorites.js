import Cookies from "js-cookie";

const addFavorite = (id, type) => {
  const cookieName =
    type === "characters" ? "favoritesCharacters" : "favoritesComics";
  let favorites = Cookies.get(cookieName)
    ? JSON.parse(Cookies.get(cookieName))
    : [];
  if (!favorites.some((favId) => String(favId) === String(id)))
    favorites.push(id);
  Cookies.set(cookieName, JSON.stringify(favorites), { expires: 30 });
};

const removeFavorite = (id, type) => {
  const cookieName =
    type === "characters" ? "favoritesCharacters" : "favoritesComics";
  let favorites = Cookies.get(cookieName)
    ? JSON.parse(Cookies.get(cookieName))
    : [];
  favorites = favorites.filter((favId) => String(favId) !== String(id));
  Cookies.set(cookieName, JSON.stringify(favorites), { expires: 30 });
};

const isFavorite = (id, type) => {
  const cookieName =
    type === "characters" ? "favoritesCharacters" : "favoritesComics";
  let favorites = Cookies.get(cookieName)
    ? JSON.parse(Cookies.get(cookieName))
    : [];
  return favorites.some((favId) => String(favId) === String(id));
};

const getFavorites = (type) => {
  const cookieName =
    type === "characters" ? "favoritesCharacters" : "favoritesComics";
  return Cookies.get(cookieName) ? JSON.parse(Cookies.get(cookieName)) : [];
};

export { addFavorite, removeFavorite, isFavorite, getFavorites };
