export default class movieService {
  constructor (httpService) {
    this._http = httpService
  }

  async get (query) {
    const { data } = await this._http.get('/genre', query)

    return data
  }
}
