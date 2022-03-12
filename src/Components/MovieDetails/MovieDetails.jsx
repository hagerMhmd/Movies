/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {

    let params = useParams();
    // eslint-disable-next-line no-unused-vars
    let baseImgUrl = 'https://image.tmdb.org/t/p/original'
    const [movie, setMovie] = useState([])
    async function getMovieDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
        setMovie(data)
        movie.push(data)
        console.log(movie);
    }
    useEffect(() => {
        getMovieDetails()
    }, [])
    return <>
        <div className="row">
            <div className="col-md-4">
            <div className="movie-items">
            <img src={baseImgUrl+movie.backdrop_path} className='w-100' alt="" />
            </div>
        </div>
        </div>
    </>
}