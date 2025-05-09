import { useState, useRef, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import axios from 'axios'
import { FaSpinner, FaBrain } from 'react-icons/fa'
import moment from 'moment'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function CodeforcesStats() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [ratingHistory, setRatingHistory] = useState(null)
  const [lastActive, setLastActive] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [challenges, setChallenges] = useState('')
  const chartRef = useRef(null)

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [])

  const fetchCodeforcesData = async (e) => {
    e.preventDefault()
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    setLoading(true)
    setError('')
    setUserData(null)
    setRatingHistory(null)
    setLastActive(null)

    try {
      const [userInfo, ratingInfo, lastSubmission] = await Promise.all([
        axios.get(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(username)}`),
        axios.get(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(username)}`),
        axios.get(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}&from=1&count=1`)
      ])

      if (userInfo.data.status === 'FAILED') {
        throw new Error(userInfo.data.comment || 'Failed to fetch user data')
      }

      setUserData(userInfo.data.result[0])
      setRatingHistory(ratingInfo.data.result)
      
      if (lastSubmission.data.result && lastSubmission.data.result.length > 0) {
        const lastActiveTime = moment.unix(lastSubmission.data.result[0].creationTimeSeconds)
        setLastActive(lastActiveTime)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.comment || err.message || 'Failed to fetch Codeforces data'
      setError(errorMessage)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const ratingChartData = ratingHistory ? {
    labels: ratingHistory.map(contest => new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString()),
    datasets: [{
      label: 'Rating',
      data: ratingHistory.map(contest => contest.newRating),
      borderColor: 'rgb(66, 133, 244)',
      tension: 0.1,
      fill: false,
      pointRadius: 4,
      pointBackgroundColor: 'rgb(66, 133, 244)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  } : null

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(107, 114, 128)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(107, 114, 128)',
          font: {
            family: "'Inter', sans-serif",
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Codeforces Statistics</h1>

        <form onSubmit={fetchCodeforcesData} className="card dark:bg-gray-800 max-w-md mx-auto mb-8">
          <div className="mb-4">
            <label htmlFor="username" className="form-label dark:text-gray-200">Codeforces Username</label>
            <input
              id="username"
              type="text"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter your Codeforces handle"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="challenges" className="form-label dark:text-gray-200">
              What's stopping you from achieving your potential?
            </label>
            <textarea
              id="challenges"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Describe your challenges (e.g., time management, difficulty with specific topics)"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              rows="4"
              disabled={loading}
            />
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
              'Get Statistics'
            )}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-error-500 bg-opacity-10 border border-error-500 rounded-md text-error-500">
              {error}
            </div>
          )}
        </form>

        {userData && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">User Profile</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img 
                      src={userData.titlePhoto} 
                      alt={userData.handle}
                      className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">{userData.handle}</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Rank: {userData.rank || 'Unrated'}
                      </p>
                      {lastActive && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last active: {lastActive.fromNow()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Current Rating</p>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {userData.rating || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Max Rating</p>
                      <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {userData.maxRating || 0}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Contribution</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {userData.contribution}
                    </p>
                  </div>
                </div>
              </div>

              {ratingHistory && ratingHistory.length > 0 && (
                <div className="card dark:bg-gray-800">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Rating History</h2>
                  <div className="h-64">
                    <Line 
                      ref={chartRef}
                      data={ratingChartData} 
                      options={chartOptions} 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center">
              <Link 
                to="/insights" 
                state={{ 
                  platform: 'codeforces',
                  userData: {
                    ...userData,
                    lastActive: lastActive ? lastActive.fromNow() : null,
                    challenges
                  }
                }}
                className="btn btn-primary flex items-center"
              >
                <FaBrain className="mr-2" /> Get AI Insights
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CodeforcesStats