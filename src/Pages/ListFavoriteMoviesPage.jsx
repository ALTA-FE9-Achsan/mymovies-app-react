import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { WithRouter } from "Utils/Navigation";
import { useTitle } from "Utils/useTitle";

import CardRemove from "Components/CardRemove";
import Layout from "Components/Layout";
import Loading from "Components/Loading";
import { setFavorites } from "Utils/Redux/Reducers/reducer";

function ListFavoriteMoviesPage() {
  const favorites = useSelector((state) => state.data.favorites);
  const dispath = useDispatch();
  useTitle("Favorite");

  const handleRemoveFav = (movie) => {
    const del = favorites.filter((e) => e !== movie);
    const newMovie = JSON.stringify(del);
    dispath(setFavorites(del));
    localStorage.setItem("favMovies", newMovie);
  };

  return (
    <Layout>
      <div>
        <p className="my-10 p-1 text-center text-lg font-bold text-white">My Favorite Movie</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {favorites.map((data) => (
            <CardRemove key={data.id} image={data.poster_path} title={data.title} onNavigate={() => this.props.navigate(`/detail/${data.id}`)} removeFavorite={() => handleRemoveFav(data)} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default WithRouter(ListFavoriteMoviesPage);
