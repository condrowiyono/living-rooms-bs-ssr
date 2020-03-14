import axios from 'axios'

const baseURL = process.env.API_URL

const OPTIONS = {
  baseURL,
  timeout: 20000
}

const livingXios = axios.create(OPTIONS)

export default livingXios
