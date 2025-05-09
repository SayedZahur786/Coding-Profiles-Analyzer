import { Link } from 'react-router-dom'
import { FaChartLine, FaRocket, FaBrain, FaCode, FaGithub } from 'react-icons/fa'
import { SiCodeforces } from 'react-icons/si'

function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20 text-white">
        <div className="container-custom mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Supercharge Your Coding Performance
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Visualize your progress across platforms, get AI-powered insights,
              and join the Beat 99% Club today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/stats" className="btn bg-white text-primary-600 hover:bg-gray-100">
                Get Started
              </Link>
              <a href="#platforms" className="btn border border-white text-white hover:bg-white/10">
                Explore Platforms
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Supported Platforms
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center hover:translate-y-[-5px] transition-transform dark:bg-gray-800">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaCode />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">LeetCode</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Track your problem-solving progress and get personalized recommendations
                for improvement.
              </p>
              <Link to="/stats" className="btn btn-primary">
                Analyze LeetCode Stats
              </Link>
            </div>
            
            <div className="card text-center hover:translate-y-[-5px] transition-transform dark:bg-gray-800">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <SiCodeforces />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Codeforces</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Visualize your competitive programming journey and get insights
                to improve your rating.
              </p>
              <Link to="/codeforces" className="btn btn-primary">
                Check CF Performance
              </Link>
            </div>
            
            <div className="card text-center hover:translate-y-[-5px] transition-transform dark:bg-gray-800">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaGithub />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">GitHub</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Analyze your open source contributions and get personalized
                project recommendations.
              </p>
              <Link to="/github" className="btn btn-primary">
                View GitHub Stats
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
            Why Join Beat 99% Club?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center hover:translate-y-[-5px] transition-transform dark:bg-gray-800">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Cross-Platform Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get comprehensive insights across LeetCode, Codeforces, and GitHub
                all in one place.
              </p>
            </div>
            
            <div className="card text-center hover:translate-y-[-5px] transition-transform dark:bg-gray-800">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaBrain />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">AI-Powered Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive personalized recommendations and actionable tips based on
                your performance.
              </p>
            </div>
            
            <div className="card text-center hover:translate-y-[-5px] transition-transform dark:bg-gray-800">
              <div className="bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                <FaRocket />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Tailored Growth Path</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get a customized learning path and project recommendations based on
                your goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Beat 99% Club?</h2>
          <p className="text-xl mb-8 opacity-80 max-w-2xl mx-auto">
            Start your journey to becoming a top performer across multiple platforms
            with data-driven insights.
          </p>
          <Link to="/stats" className="btn btn-primary text-lg px-8 py-3">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home