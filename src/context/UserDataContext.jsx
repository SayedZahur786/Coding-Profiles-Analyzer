import { createContext, useState, useContext } from 'react'

const UserDataContext = createContext()

export function useUserData() {
  return useContext(UserDataContext)
}

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [codingDuration, setCodingDuration] = useState('')

  const fetchUserData = async (username) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`)
      }
      
      const data = await response.json()
      if (data.status === 'error') {
        throw new Error(`${data.message || 'User not found'}`)
      }
      
      setUserData(data)
      return data
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const clearUserData = () => {
    setUserData(null)
    setError(null)
  }

  const value = {
    userData,
    loading,
    error,
    fetchUserData,
    clearUserData,
    codingDuration,
    setCodingDuration
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}