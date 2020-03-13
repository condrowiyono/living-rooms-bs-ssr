export default class movieService {
  constructor (httpService) {
    this._http = httpService
  }

  async detail (query) {
    const { data } = await this._http.get('video', query)

    return data
  }
}
