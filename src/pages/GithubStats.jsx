import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaSpinner, FaGithub, FaStar, FaCodeBranch, FaBrain } from 'react-icons/fa'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import moment from 'moment'

function GithubStats() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [role, setRole] = useState('')
  const [primaryStack, setPrimaryStack] = useState('')
  const [secondaryStack, setSecondaryStack] = useState('')
  const [otherLanguages, setOtherLanguages] = useState('')

  const fetchGithubData = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const [userResponse, reposResponse, eventsResponse] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`, {
          headers: { 'Accept': 'application/json' }
        }),
        axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          headers: { 'Accept': 'application/json' }
        }),
        axios.get(`https://api.github.com/users/${username}/events?per_page=1`, {
          headers: { 'Accept': 'application/json' }
        })
      ])
      
      const lastActive = eventsResponse.data.length > 0 
        ? new Date(eventsResponse.data[0].created_at)
        : new Date()

      setUserData({
        ...userResponse.data,
        repos: reposResponse.data,
        lastActive
      })
    } catch (err) {
      setError('Failed to fetch GitHub data. Please check the username and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">GitHub Statistics</h1>

        <form onSubmit={fetchGithubData} className="card dark:bg-gray-800 max-w-md mx-auto mb-8">
          <div className="mb-4">
            <label htmlFor="username" className="form-label dark:text-gray-200">GitHub Username</label>
            <input
              id="username"
              type="text"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Enter your GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="form-label dark:text-gray-200">Prioritized Role</label>
            <input
              id="role"
              type="text"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="frontend engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="primaryStack" className="form-label dark:text-gray-200">Primary Tech Stack</label>
            <input
              id="primaryStack"
              type="text"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="React, Node.js, TypeScript"
              value={primaryStack}
              onChange={(e) => setPrimaryStack(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="secondaryStack" className="form-label dark:text-gray-200">Secondary Tech Stack</label>
            <input
              id="secondaryStack"
              type="text"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Python, Django, PostgreSQL"
              value={secondaryStack}
              onChange={(e) => setSecondaryStack(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="otherLanguages" className="form-label dark:text-gray-200">Other Languages</label>
            <input
              id="otherLanguages"
              type="text"
              className="form-input dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Java, C++, Go"
              value={otherLanguages}
              onChange={(e) => setOtherLanguages(e.target.value)}
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
                <div className="flex items-center mb-6">
                  <img 
                    src={userData.avatar_url} 
                    alt={userData.login}
                    className="w-20 h-20 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">{userData.name || userData.login}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
                    {userData.lastActive && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last active: {moment(userData.lastActive).fromNow()}
                      </p>
                    )}
                    <a 
                      href={userData.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:text-primary-600 flex items-center mt-2"
                    >
                      <FaGithub className="mr-2" /> View Profile
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {userData.followers}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Following</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {userData.following}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Public Repositories</p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {userData.public_repos}
                  </p>
                </div>
              </div>

              <div className="card dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Top Repositories</h2>
                <div className="space-y-4">
                  {userData.repos.slice(0, 5).map(repo => (
                    <div key={repo.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400"
                      >
                        {repo.name}
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {repo.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <FaStar className="mr-1" /> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center text-gray-600 dark:text-gray-300">
                          <FaCodeBranch className="mr-1" /> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Link 
                to="/insights" 
                state={{ 
                  platform: 'github',
                  userData: {
                    ...userData,
                    role,
                    primaryStack,
                    secondaryStack,
                    otherLanguages
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

export default GithubStats