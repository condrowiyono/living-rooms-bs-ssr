import axios from './livingXios'
import HttpService from './HttpService'

import MovieService from './movieService'
import PlayerService from './playerService'
import VideoService from './videoService'
import GenreService from './genreService'

export const httpService = new HttpService(axios)

export const movieService = new MovieService(httpService)
export const playerService = new PlayerService(httpService)
export const videoService = new VideoService(httpService)
export const genreService = new GenreService(httpService)
