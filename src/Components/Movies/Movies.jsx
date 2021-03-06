// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
import styles from '../style.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MediaContext } from '../../MediaContex'



export default function Movies() {

  let { trendingMovies, baseImgUrl } = useContext(MediaContext)
  return <>
    {trendingMovies ? <div className="row align-items-center my-3">
      <div className="col-md-4 d-flex align-items-center ">
        <div>
          <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h2>Trending <br /> Movies <br /> To watch now</h2>
          <p className='lead second-color'>Most whatched movies by day</p>
          <div className={`${styles.brdr} mt-4`}></div>
        </div>
      </div>
      {trendingMovies.map((movie, index) =>
        <div className="col-md-2 my-3 " key={index}>
          <div className={`${styles.img} position-relative`}>
            <Link to={`/movieDetails/${movie.id}`}>
              <img src={baseImgUrl + movie.poster_path} className='w-100' alt="" />
              <h5 className='py-3'>{movie.title.substr(0, 16)}</h5>
              <span className={`${styles.rating} position-absolute bg-info`}>{movie.vote_average}</span>
            </Link>
          </div>
        </div>
      )}
    </div> : <div className='vh-100 d-flex justify-content-center bg-danger align-items-center'>
      <i className='fas fa-spin fa-spinner fs-1'></i>
    </div>
    }





  </>
}







// f1aca93e54807386df3f6972a5c33b50






  // let baseImgUrl = 'https://image.tmdb.org/t/p/original'

  // const [trendingMovies, setTrendingMovies] = useState([])
  // const [trendingTvShows, setTrendingTvShows] = useState([])
  // const [trendingPerson, setTrendingPerson] = useState([])


  // async function getTrendingItems(mediaType, callback) {
  //   let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
  //   callback(data.results.splice(0, 10))
  //   // console.log("data results =>", data.results.splice(0, 10));
  // }
  // useEffect(() => {
  //   getTrendingItems('movie', setTrendingMovies)
  //   getTrendingItems('tv', setTrendingTvShows)
  //   getTrendingItems('person', setTrendingPerson)
  // }, [])
