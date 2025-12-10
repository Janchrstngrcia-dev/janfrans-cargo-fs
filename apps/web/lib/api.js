const API_BASE_URL = 'http://localhost:5000/api'

const api = {
  fetchWithAuth: async (url, options = {}) => {
    const token = localStorage.getItem('token')
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return fetch(url, {
      ...options,
      headers,
    })
  },

  get: async (endpoint) => {
    const response = await api.fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'GET'
    })
    
    const data = await response.json()
    return { data, response }
  },

  post: async (endpoint, body) => {
    const response = await api.fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    return { data, response }
  },

  put: async (endpoint, body) => {
    const response = await api.fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    return { data, response }
  },

  delete: async (endpoint) => {
    const response = await api.fetchWithAuth(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    })
    
    const data = await response.json()
    return { data, response }
  },

  verifyToken: async () => {
    try {
      const { data, response } = await api.get('/auth/me')
      
      if (!response.ok) {
        return null
      }
      
      return data.user
    } catch (error) {
      console.error('Token verification failed:', error)
      return null
    }
  }
}

// Export both named and default
export const fetchWithAuth = api.fetchWithAuth
export const verifyToken = api.verifyToken
export default api