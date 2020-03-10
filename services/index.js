import axios from './livingXios'
import HttpService from './HttpService'

import MovieService from './movieService'

export const httpService = new HttpService(axios)

export const movieService = new MovieService(httpService)
