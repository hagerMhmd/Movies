/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {
    // ---------------- movie details variables -------------------------
    let params = useParams();
    const baseImgUrl = 'https://image.tmdb.org/t/p/original'
    const [movie, setMovie] = useState([])
    const {vote_average , vote_count , popularity , release_date} = movie
    // ----------------------- Movie Details Api integration -----------------------
    async function getMovieDetails() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
        setMovie(data)
    }
    // ----------------- dispaly moveis ----------------------
    useEffect(() => {
        getMovieDetails()
    }, [])
    return <>
        <div className="row my-5">
            <div className="col-md-4">
                <div className="movie-items">
                    {movie.poster_path === null ? <h1>not found</h1> : <img src={baseImgUrl + movie.poster_path} className='w-100' alt="" />}
                </div>
            </div>
            <div className="col-md-8 ps-5">
                <h1 className='mb-3'>{movie.title}</h1>
                <h4 className='my-3'>{movie.original_title}</h4>
                {/* <div className="d-flex">
                    <p className='px-2 rounded-3 mt-3 me-3 bg-info py-3'>{movie.spoken_languages[0].english_name}</p>
                    <p className='px-2 rounded-3 mt-3 mx-3 bg-info py-3'>{movie.production_countries[0].name}</p>
                    <p className='px-2 rounded-3 mt-3 mx-3 bg-info py-3'>{movie.genres[0].name}</p>
                </div> */}
                <h4 className='my-5'>Vote : <span className='fs-5'>{vote_average}</span></h4>
                <h4 className='my-5'>Vote count<span className='fs-5'> {vote_count}</span></h4>
                <h4 className='my-5'>Popularity : <span className='fs-5'>{popularity}</span></h4>
                <h4 className='my-5'>Release date : <span className='fs-5'>{release_date}</span></h4>
                <p className='lead text-muted my-3'>{movie.overview}</p>
            </div>
        </div>
    </>
}