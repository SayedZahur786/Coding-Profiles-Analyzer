import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from '../context/UserDataContext'
import StatsForm from '../components/StatsForm'
import StatsDisplay from '../components/StatsDisplay'
import { FaSpinner } from 'react-icons/fa'

function Stats() {
  const { userData, loading } = useUserData()
  const navigate = useNavigate()
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">LeetCode Statistics</h1>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="text-primary-500 text-4xl animate-spin mb-4" />
            <p className="text-gray-600">Fetching your LeetCode stats...</p>
          </div>
        ) : (
          <>
            {!userData ? (
              <div className="flex flex-col items-center justify-center py-10">
                <StatsForm />
              </div>
            ) : (
              <StatsDisplay />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Stats