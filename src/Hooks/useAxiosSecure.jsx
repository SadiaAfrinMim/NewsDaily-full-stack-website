// import axios from 'axios'

// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import useAuth from './useAuth'



// export const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// })

// const useAxiosSecure = () => {
//   const navigate = useNavigate()
//   const { logOut } = useAuth()
//   useEffect(() => {
//     axiosSecure.interceptors.response.use(
//       res => {
//         return res
//       },
//       async error => {
//         console.log('Error caught from axios interceptor-->', error.response)
//         if (error.response.status === 401 || error.response.status === 403) {
//           // logout
//           logOut()
//           // navigate to login
//           navigate('/login')
//         }
//         return Promise.reject(error)
//       }
//     )
//   }, [logOut, navigate])
//   return axiosSecure
// }

// export default useAxiosSecure




import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'



export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useAuth()
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// intercepts 401 and 403 status
axiosSecure.interceptors.response.use(function (response) {
    return response;
}, async (error) => {
    const status = error.response.status;
    // console.log('status error in the interceptor', status);
    // for 401 or 403 logout the user and move the user to the login
    if (status === 401 || status === 403) {
        await logOut();
        navigate('/login');
    }
    return Promise.reject(error);
})


return axiosSecure;
}

export default useAxiosSecure