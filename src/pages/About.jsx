import { useState } from 'react'
import { FaLinkedin, FaCode, FaChartLine, FaBrain, FaMobile } from 'react-icons/fa'
import { SiCodeforces } from 'react-icons/si'

function About() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    }
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">About Beat 99% Club</h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="card dark:bg-dark-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">About the Creator</h2>
              
              <div className="flex items-center mb-6">
                <img 
                  src="developer.jpg" 
                  alt="Mohd Jahur"
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Mohd Jahur (Sayed Zahur) Zaidi</h3>
                  <p className="text-gray-600 dark:text-gray-400">Full Stack Developer | AI Enthusiast | Open Source Contributor</p>
                </div>
              </div>
              
              <a 
                href="https://www.linkedin.com/in/sayedzahur786/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 mb-4"
              >
                <FaLinkedin className="mr-2" /> LinkedIn Profile
              </a>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 dark:text-gray-200">Core Expertise</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center bg-primary-50 dark:bg-dark-300 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full">
                  <FaBrain className="mr-2" /> AI/ML Development
                </div>
                <div className="flex items-center bg-primary-50 dark:bg-dark-300 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full">
                  <FaCode className="mr-2" /> Full Stack Development
                </div>
                <div className="flex items-center bg-primary-50 dark:bg-dark-300 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full">
                  <FaChartLine className="mr-2" /> Data Analytics
                </div>
                <div className="flex items-center bg-primary-50 dark:bg-dark-300 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full">
                  <SiCodeforces className="mr-2" /> Competitive Programming
                </div>
              </div>
            </div>
            
            <div className="card dark:bg-dark-200 mt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">About Beat 99% Club</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Beat 99% Club is your comprehensive coding performance analyzer, designed to help developers 
                track and improve their skills across multiple platforms. We combine data from LeetCode, 
                Codeforces, and GitHub to provide a holistic view of your coding journey.
              </p>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Our platform leverages advanced AI technology to analyze your performance patterns and 
                provide personalized recommendations. Whether you're preparing for technical interviews, 
                participating in competitive programming, or contributing to open source, we help you 
                make data-driven decisions about your learning path.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 dark:text-gray-200">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Cross-platform performance tracking (LeetCode, Codeforces, GitHub)</li>
                <li>AI-powered personalized insights and recommendations</li>
                <li>Detailed analytics and progress visualization</li>
                <li>Custom learning paths based on your goals</li>
                <li>Performance tracking and improvement suggestions</li>
                <li>Open source contribution guidance</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3 dark:text-gray-200">Technology Stack</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li>React with Vite for lightning-fast performance</li>
                <li>Tailwind CSS for modern, responsive design</li>
                <li>Chart.js for interactive data visualization</li>
                <li>Google's Gemini AI for intelligent insights</li>
                <li>Multiple platform APIs for comprehensive data analysis</li>
              </ul>
            </div>
          </div>
          
          <div className="card dark:bg-dark-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Contact Me</h2>
            
            {submitted ? (
              <div className="bg-success-500 bg-opacity-10 border border-success-500 rounded-md p-4 mb-6">
                <p className="text-success-500 font-medium">Thank you for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input dark:bg-dark-300 dark:text-gray-200 dark:border-gray-600 ${errors.name ? 'border-error-500' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="form-label dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input dark:bg-dark-300 dark:text-gray-200 dark:border-gray-600 ${errors.email ? 'border-error-500' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="form-label dark:text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className={`form-input dark:bg-dark-300 dark:text-gray-200 dark:border-gray-600 ${errors.message ? 'border-error-500' : ''}`}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>
                
                <button type="submit" className="btn btn-primary w-full dark:bg-primary-600 dark:hover:bg-primary-700">
                  Send Message
                </button>
              </form>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 dark:text-gray-200">Other Ways to Reach Me</h3>
              <p className="mb-2 dark:text-gray-300">
                <strong>Email:</strong> sayedzahur786@gmail.com
              </p>
              <p className="dark:text-gray-300">
                <strong>GitHub:</strong> github.com/SayedZahur786
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About