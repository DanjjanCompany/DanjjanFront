import axios from 'axios'

// axios 객체 생성 후 export
export default axios.create({
  baseURL: 'http://192.168.130.83:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
