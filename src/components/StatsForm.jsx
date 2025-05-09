import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../context/UserDataContext'
import { FaSearch, FaSpinner } from 'react-icons/fa'

function StatsForm() {
  const [username, setUsername] = useState('')
  const [duration, setDuration] = useState('')
  const [validationError, setValidationError] = useState('')
  const { fetchUserData, loading, error, setCodingDuration } = useUserData()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate username
    if (!username.trim()) {
      setValidationError('Username is required')
      return
    }
    
    setValidationError('')
    const data = await fetchUserData(username)
    
    if (data) {
      // Store coding duration in context
      setCodingDuration(duration)
      // Navigate to stats page (it will automatically show the stats since data is in context)
      navigate('/stats', { replace: true })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-md w-full animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Fetch Your LeetCode Stats</h2>
      
      <div className="mb-4">
        <label htmlFor="username" className="form-label">LeetCode Username</label>
        <div className="relative">
          <input
            id="username"
            type="text"
            className="form-input pl-10"
            placeholder="Enter your LeetCode username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              if (validationError) setValidationError('')
            }}
            disabled={loading}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
        </div>
        {validationError && <p className="form-error">{validationError}</p>}
      </div>
      
      <div className="mb-6">
        <label htmlFor="duration" className="form-label">Coding Experience (months)</label>
        <input
          id="duration"
          type="number"
          min="0"
          className="form-input"
          placeholder="How long have you been coding?"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          This helps our AI provide more tailored insights
        </p>
      </div>
      
      <button 
        type="submit"
        className="btn btn-primary w-full flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin mr-2" /> 
            Fetching Data...
          </>
        ) : (
          'Analyze My Stats'
        )}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-error-500 bg-opacity-10 border border-error-500 rounded-md text-error-500">
          {error}
        </div>
      )}
    </form>
  )
}

export default StatsForm