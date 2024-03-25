import axios from 'axios'

const client = function () {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('auth.user')
        window.location.href = '/'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export const getFile = (path: string) => {
  return import.meta.env.VITE_BASE_API_URL + path
}

export default client
