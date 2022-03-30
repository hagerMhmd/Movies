import React from 'react'
import { useContext } from 'react'
import { MediaContext } from '../../MediaContex'
import styles from '../style.module.css'

export default function People() {

  let {trendingPerson ,  baseImgUrl} = useContext(MediaContext)

  return <>
    <div className="row align-items-center my-3">
      <div className="col-md-4 d-flex align-items-center ">
        <div>
          <div className={`${styles.brdr} w-25 mb-4`}></div>
          <h2>Trending <br /> Person <br /> To watch now</h2>
          <p className='lead second-color'>Most whatched person by day</p>
          <div className={`${styles.brdr} mt-4`}></div>
        </div>
      </div>
      {trendingPerson.map((person, index) =>
        <div className="col-md-2 my-3 " key={index}>
          <div className={`${styles.img} position-relative`}>
            <img src={baseImgUrl + person.profile_path} className='w-100' alt="" />
            <h5 className='py-3'>{person.name}</h5>
            <span className={`${styles.rating} position-absolute bg-info`}>{person.known_for[0].vote_average}</span>
          </div>
        </div>
      )}
    </div>
  </>
}
