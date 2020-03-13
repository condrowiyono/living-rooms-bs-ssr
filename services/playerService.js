export default class movieService {
  constructor (httpService) {
    this._http = httpService
  }

  async detail (query) {
    const { data } = await this._http.get('player', query)

    return data
  }
}
