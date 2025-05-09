import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { FaBrain } from 'react-icons/fa'
import { useUserData } from '../context/UserDataContext'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

function StatsDisplay() {
  const { userData } = useUserData()
  
  if (!userData) {
    return null
  }
  
  // Calculate solving percentage for each difficulty
  const easySolvedPercentage = (userData.easySolved / (userData.totalEasy || 1) * 100).toFixed(1)
  const mediumSolvedPercentage = (userData.mediumSolved / (userData.totalMedium || 1) * 100).toFixed(1)
  const hardSolvedPercentage = (userData.hardSolved / (userData.totalHard || 1) * 100).toFixed(1)
  
  // Data for doughnut chart (difficulty distribution)
  const difficultyData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [userData.easySolved, userData.mediumSolved, userData.hardSolved],
        backgroundColor: ['#34A853', '#FBBC05', '#EA4335'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  }
  
  // Data for bar chart (completion percentage)
  const completionData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: 'Completion Percentage',
        data: [easySolvedPercentage, mediumSolvedPercentage, hardSolvedPercentage],
        backgroundColor: ['rgba(52, 168, 83, 0.6)', 'rgba(251, 188, 5, 0.6)', 'rgba(234, 67, 53, 0.6)'],
        borderColor: ['rgb(52, 168, 83)', 'rgb(251, 188, 5)', 'rgb(234, 67, 53)'],
        borderWidth: 1,
      },
    ],
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
  }
  
  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          callback: (value) => `${value}%`,
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
        },
      },
    },
  }

  return (
    <div className="animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        {/* User Summary Card */}
        <div className="card dark:bg-dark-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">User Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Solved</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{userData.totalSolved}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">out of {userData.totalQuestions}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Rank</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">#{userData.ranking}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{userData.acceptanceRate}%</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-dark-300 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Contribution</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{userData.contributionPoints}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">points</p>
            </div>
          </div>
        </div>
        
        {/* Difficulty Distribution Chart */}
        <div className="card dark:bg-dark-200 flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Solved by Difficulty</h3>
          <div className="flex-grow flex justify-center items-center">
            <div className="w-60 h-60">
              <Doughnut 
                data={difficultyData}
                options={chartOptions}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Difficulty Breakdown */}
      <div className="card dark:bg-dark-200 mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Difficulty Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-dark-300">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Solved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Percentage</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-success-500 mr-2"></div>
                    <span className="font-medium dark:text-gray-200">Easy</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{userData.easySolved}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{userData.totalEasy}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{easySolvedPercentage}%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-warning-500 mr-2"></div>
                    <span className="font-medium dark:text-gray-200">Medium</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{userData.mediumSolved}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{userData.totalMedium}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{mediumSolvedPercentage}%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-error-500 mr-2"></div>
                    <span className="font-medium dark:text-gray-200">Hard</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{userData.hardSolved}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{userData.totalHard}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{hardSolvedPercentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Completion percentage bar chart */}
      <div className="card dark:bg-dark-200 mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Completion Percentage</h3>
        <div className="h-64">
          <Bar data={completionData} options={barOptions} />
        </div>
      </div>
      
      {/* Get AI Insights Button */}
      <div className="mt-8 text-center">
        <Link 
          to="/insights"
          className="btn btn-primary inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          <FaBrain className="mr-2" /> Get AI Insights
        </Link>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Get personalized recommendations based on your performance
        </p>
      </div>
    </div>
  )
}

export default StatsDisplay