/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import React from 'react'
import axios from 'axios'

export let MediaContext = createContext([])

export function MediaContexProvider(props) {
    const baseImgUrl = 'https://image.tmdb.org/t/p/original'
    const [trendingMovies, setTrendingMovies] = useState([])
    const [trendingTvShows, setTrendingTvShows] = useState([])
    const [trendingPerson, setTrendingPerson] = useState([])

    async function getTrendingItems(mediaType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`)
        callback(data.results.splice(0, 16))
    }
    useEffect(() => {
        getTrendingItems('movie', setTrendingMovies)
        getTrendingItems('tv', setTrendingTvShows)
        getTrendingItems('person', setTrendingPerson)
    }, [])

    return <MediaContext.Provider value={{ trendingMovies , trendingTvShows , trendingPerson , baseImgUrl }}>
        {props.children}
    </MediaContext.Provider>
}
