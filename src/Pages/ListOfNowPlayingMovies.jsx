import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "Styles/App.css";

import { WithRouter } from "Utils/Navigation";
import { useTitle } from "Utils/useTitle";

import { ButtonSecondary } from "Components/Button";
import Card from "Components/Card";
import Layout from "Components/Layout";
import Loading from "Components/Loading";
import { setFavorites } from "Utils/Redux/Reducers/reducer";

function Home(props) {
  // ---=== CONSTRUCTOR START ===---
  const dispath = useDispatch();
  const [title] = useState("NOW PLAYING");
  const [datas, setData] = useState([]);
  const [skeleton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  // ---=== CONSTRUCTOR START ===---
  useTitle("My Movie");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMBD_KEY}&page=${page}`)
      .then((res) => {
        const { results } = res.data;
        const newPage = page + 1;
        const temp = [...datas];
        temp.push(...results);
        setData(temp);
        setPage(newPage);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleFav(movie) {
    const getMovies = localStorage.getItem("favMovies");
    if (getMovies) {
      const parsedMovies = JSON.parse(getMovies);
      const favMovie = parsedMovies.find((obj) => obj.title === movie.title);
      if (favMovie) return alert(`Film Sudah ditambahkan`);

      parsedMovies.push(movie);
      const temp = JSON.stringify(parsedMovies);
      dispath(setFavorites(parsedMovies));
      localStorage.setItem("favMovies", temp);
    } else {
      const temp = JSON.stringify([movie]);
      localStorage.setItem("favMovies", temp);
    }
  }

  return (
    <>
      <Layout>
        <div className="flex w-full flex-col">
          <p className="my-10 p-1 text-center text-lg font-bold text-white">{title}</p>
          <div className="m-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {loading
              ? skeleton.map((item) => <Loading key={item} />)
              : datas.map((data) => <Card key={data.id} image={data.poster_path} title={data.title} judul={data.title} onNavigate={() => props.navigate(`/detail/${data.id}`)} addFavorite={() => handleFav(data)} />)}
            <p></p>
          </div>
          <div className="flex justify-center">
            <ButtonSecondary label="Load More" onClick={() => fetchData()} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default WithRouter(Home);
