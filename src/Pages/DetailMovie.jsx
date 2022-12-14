import React, { useState, useEffect } from "react";
import Layout from "Components/Layout";
import { ButtonPrimary } from "Components/Button";

import axios from "axios";

import { WithRouter } from "Utils/Navigation";
import { useTitle } from "Utils/useTitle";

function DetailMovie(props) {
  const [data, setData] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle(data?.title);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const { id_movie } = props.params;
    axios
      .get(`https://api.themoviedb.org/3/movie/${id_movie}?api_key=${process.env.REACT_APP_TMBD_KEY}&append_to_response=videos`)
      .then((res) => {
        const { data } = res;
        setData(data);
        setVideos(data.videos.results);
      })
      .catch((err) => {
        alert(err.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Layout>
      <div className="lg:p-10">
        <div className="m-10 grid items-center gap-5 border border-red-700 bg-slate-200 p-5 shadow-lg dark:border-white dark:bg-slate-400 md:grid-flow-col md:grid-rows-3 lg:rounded-lg">
          <div className="m-2 flex flex-col justify-center rounded-lg border border-red-700 bg-white p-4 text-lg shadow-lg dark:border-white dark:bg-slate-500 md:row-span-3">
            <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} alt={props.title} />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-lg font-bold">
              <p>{data?.title}</p>
            </h1>
          </div>
          <div className="md:col-span-2 md:row-span-2">
            <p>
              <strong>Runtime :</strong> {data?.runtime}
            </p>
            <p>
              <strong>Release date :</strong> {data?.release_date}
            </p>
            <p>
              <strong>Genre : </strong>
            </p>
            <p>
              <strong>Language : </strong>
              {data?.original_language}
            </p>
            <p className="mb-5">
              <p>
                {" "}
                <strong>Overview : </strong>
                {data?.overview}
              </p>
            </p>
            <ButtonPrimary label="Watch Now" />
          </div>
        </div>
      </div>

      <div className="grid place-content-around gap-2 lg:grid-cols-2">
        {videos.map((video) => (
          <iframe
            id={video.id}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        ))}
      </div>
    </Layout>
  );
}

export default WithRouter(DetailMovie);
