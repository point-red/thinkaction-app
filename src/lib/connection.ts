import axios from 'axios'

const client = function () {
  const headers: Record<string, string> = {}
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers
  })

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('auth.user')
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export const getFile = (path: string) => {
  if (!path) {
    return ''
  }
  if (path.startsWith('http')) {
    return path
  }
  return import.meta.env.VITE_ASSET_API_URL + path
}

export default client
