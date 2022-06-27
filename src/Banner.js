import React, { useEffect, useState } from 'react';
import requests from './requests';
import axios from './axios';
import './Banner.css';
const base_URL = "https://image.tmdb.org/t/p/original";
function truncate(str,n){
    return str?.length>n ?str.substr(0,n-1)+"...":str;
}
function Banner() {
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random()*request.data.results.length-1)
            ]);
            return request;
        }
        fetchData();
    },[]);
    const URL=`${base_URL}${movie?.backdrop_path}`;
  return (
    <header className="banner"
    style={{
        backgroundSize:"cover",
        backgroundImage:`url(${base_URL}${movie?.backdrop_path})`,
        backgroundPosition:"center center",
    }}>
        <div className="banner_contents">
        <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
        </div>
        <h1 className='banner_description'>{truncate(movie?.overview,150)}</h1>
        </div>
        <div className='banner--fadeBottom'></div>
    </header> 
    )
}

export default  Banner;