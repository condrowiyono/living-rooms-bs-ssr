export default class movieService {
  constructor (httpService) {
    this._http = httpService
  }

  async get (query) {
    const { data } = await this._http.get('/movie', query)

    return data
  }

  async detail (id) {
    const { data } = await this._http.get(`/movie/${id}`)

    return data
  }
}
