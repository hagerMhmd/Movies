/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function MovieDetails() {

    // eslint-disable-next-line no-unused-vars
    let params = useParams();
    // eslint-disable-next-line no-unused-vars
    let baseImgUrl = 'https://image.tmdb.org/t/p/original'
    // eslint-disable-next-line no-unused-vars
    const [movie, setMovie] = useState([])

    async function getMovieDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
        setMovie(data)
        console.log(data.production_companies[0].id);
        console.log(data.production_countries[0].name);
    }

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
                    <h4 className='px-2 rounded-3 mt-3 me-3 bg-info py-3'>{movie.spoken_languages[0].english_name}</h4>
                    <h4 className='px-2 rounded-3 mt-3 mx-3 bg-info py-3'>{movie.production_countries[0].name}</h4>
                    <h4 className='px-2 rounded-3 mt-3 mx-3 bg-info py-3'>{movie.genres[0].name}</h4>
                </div> */}
                <h4 className='my-5'>Vote : <span className='fs-5'>{movie.vote_average}</span></h4>
                <h4 className='my-5'>Vote count<span className='fs-5'> {movie.vote_count}</span></h4>
                <h4 className='my-5'>Popularity : <span className='fs-5'>{movie.popularity}</span></h4>
                <h4 className='my-5'>Release date : <span className='fs-5'>{movie.release_date}</span></h4>
                <p className='lead text-muted my-3'>{movie.overview}</p>
            </div>
        </div>
    </>
}