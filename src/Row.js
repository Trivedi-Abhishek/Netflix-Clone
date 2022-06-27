import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import  Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";
const base_URL = "https://image.tmdb.org/t/p/original";
const row_poster="row_poster";
function Row({ title, fetchUrl,isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
    //   console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  const opts={
    height:"300",
    width:"100%",
    playerVars:{
      autoplay:1,
    },
  };
  const handleClick=(movie)=>{
    if(trailerUrl){
      setTrailerUrl('');
    }
    else{
      movieTrailer(movie?.name || "")
       .then((url)=>{
        const urlParams=new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
       })
       .catch((error)=>console.log(error));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie, index) => (
          <img
          key={movie.id}
          onClick={()=>handleClick(movie)}
            className={`${row_poster} ${isLargeRow ? "row__posterLarge":"row_posterSmall"}`}
            src={`${base_URL}${movie.poster_path}`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}
export default Row;
