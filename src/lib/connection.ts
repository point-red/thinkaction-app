import axios from 'axios'

const client = function () {
  return axios.create({
    baseURL: process.env.VITE_BASE_API_URL
  })
}

export default client
