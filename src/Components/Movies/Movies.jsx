import styles from '../style.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { MediaContext } from '../../MediaContex'

export default function Movies() {
  const { trendingMovies, baseImgUrl } = useContext(MediaContext)
  return <>
    {trendingMovies.length > 0 ? <div className="row align-items-center my-3">
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
    </div>
      :
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <i class="fa-solid fa-spin fa-circle-notch fs-1"></i>
      </div>
    }
  </>
}