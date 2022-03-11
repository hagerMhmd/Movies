import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
export default function Home() {


  let baseImgUrl = 'https://image.tmdb.org/t/p/original'

  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTvShows, setTrendingTvShows] = useState([])
  const [trendingPerson, setTrendingPerson] = useState([])


  async function getTrendingItems(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
    callback(data.results.splice(0,10))
  }
  useEffect(() => {
    getTrendingItems('movie', setTrendingMovies)
    getTrendingItems('tv', setTrendingTvShows)
    getTrendingItems('person', setTrendingPerson)
  }, [])

  return <>
    <div className="row align-items-center my-3">
      <div className="col-md-4 d-flex align-items-center ">
        {/* <h1>Trending <br /> Movies <br /> To watch now</h1> */}
        <div>
          <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h2>Trending </h2>
          <h2>Movies</h2>
          <h2>To watch now</h2>
          <p className='lead second-color'>Most whatched movies by day</p>
          <div className={`${styles.brdr} mt-4`}></div>
        </div>
      </div>
      {trendingMovies.map((movie, index) =>
        <div className="col-md-2 my-3 " key={index}>
          <div className={`${styles.img} position-relative`}>
            <img src={baseImgUrl + movie.poster_path} className='w-100' alt="" />
            <h5 className='py-3'>{movie.title.substr(0,16)}</h5>
            <span className={` ${styles.rating} position-absolute bg-info`}>{movie.vote_average}</span>
          </div>
        </div>
      )}
    </div>

    <div className="row align-items-center my-3">
      <div className="col-md-4 d-flex align-items-center ">
        {/* <h1>Trending <br /> Movies <br /> To watch now</h1> */}
        <div>
          <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h2>Trending </h2>
          <h2>Tv Shows</h2>
          <h2>To watch now</h2>
          <p className='lead second-color'>Most whatched tv shows by day</p>
          <div className={`${styles.brdr} mt-4`}></div>
        </div>
      </div>
      {trendingTvShows.map((tv, index) =>
        <div className="col-md-2 my-3 " key={index}>
          <div className={`${styles.img} position-relative`}>
            <img src={baseImgUrl + tv.poster_path} className='w-100' alt="" />
            <h5 className='py-3'>{tv.name.substr(0,16)}</h5>
            <span className={` ${styles.rating} position-absolute bg-info`}>{tv.vote_average}</span>
          </div>
        </div>
      )}
    </div>

    <div className="row align-items-center my-3">
      <div className="col-md-4 d-flex align-items-center ">
        {/* <h1>Trending <br /> Movies <br /> To watch now</h1> */}
        <div>
          <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h2>Trending </h2>
          <h2>Person</h2>
          <h2>To watch now</h2>
          <p className='lead second-color'>Most whatched person by day</p>
          <div className={`${styles.brdr} mt-4`}></div>
        </div>
      </div>
      {trendingPerson.map((person, index) =>
        <div className="col-md-2 my-3 " key={index}>
          <div className={`${styles.img} position-relative`}>
            <img src={baseImgUrl + person.profile_path} className='w-100' alt="" />
            <h5 className='py-3'>{person.name}</h5>
            <span className={` ${styles.rating} position-absolute bg-info`}>{person.known_for[0].vote_average}</span>

          </div>
        </div>
      )}
    </div>
  </>
}
