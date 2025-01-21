/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../Firebase/firebase_init_'
import axios from 'axios'

export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = async (email, password) => {
    setLoading(true)
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    try {
      return await signInWithEmailAndPassword(auth, email, password)
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      return await signInWithPopup(auth, googleProvider)
    } finally {
      setLoading(false)
    }
  }

  const logOut = async () => {
    localStorage.removeItem('user_is_admin')
    localStorage.removeItem('role')
    setLoading(true)
    try {
      await signOut(auth)
    } finally {
      setLoading(false)
    }
  }

  const updateUserProfile = async (name, photo) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }
    return Promise.reject(new Error('No authenticated user to update profile'))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('CurrentUser -->', currentUser)
      setUser(currentUser)

      if (currentUser) {
        const userInfo = { email: currentUser.email }
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            userInfo
          )
          if (data.token) {
            localStorage.setItem('access-token', data.token)
          }
        } catch (error) {
          console.error('Failed to fetch token', error)
        } finally {
          setLoading(false)
        }
      } else {
        localStorage.removeItem('access-token')
        setLoading(false)
      }
    })

    // if (currentUser?.email) {
      //     setUser(currentUser)
  
      //     // Get JWT token
      //     await axios.post(
      //       `${import.meta.env.VITE_API_URL}/jwt`,
      //       {
      //         email: currentUser?.email,
      //       },
      //       { withCredentials: true }
      //     )
      //   } else {
      //     setUser(currentUser)
      //     await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      //       withCredentials: true,
      //     })
      //   }
      //   setLoading(false)
      // })

    return () => unsubscribe()
  }, [])

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
