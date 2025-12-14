import React from 'react'
import { Droplets, TrendingUp, DollarSign, FileText, Sparkles, Shield, Cloud, Building } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
  return (
    <div>
          <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-teal-600" />
            <span className="text-2xl font-bold text-gray-900">JalMitra</span>
          </div>
          <div className="flex gap-4">
            <button
            onClick={() => navigate('/login')}

              className="px-4 py-2 text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={()=> navigate('/signup')}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-md hover:shadow-lg font-medium"
            >
              Start Analysis
            </button>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          AI-Powered Rainwater Analysis
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Calculate Your Rainwater<br />
          <span className="text-teal-600">Harvesting Potential with AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Make informed decisions about rainwater harvesting with real-time rainfall data,
          engineering-grade calculations, and AI-powered feasibility reports.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={ ()=> navigate('/signup')}
            className="px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            Start Free Analysis
          </button>
          <button
             onClick={()=>  navigate('/login')}
            className="px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-teal-600 font-semibold text-lg"
          >
            Login
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Powerful Features for Smart Water Management
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Cloud className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Rainfall Analytics</h3>
            <p className="text-gray-600">
              Access accurate rainfall data from meteorological sources to understand your location's water potential.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Engineering-Grade Calculations</h3>
            <p className="text-gray-600">
              Get precise calculations for harvested water volume, tank sizing, and system design based on your property.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">ROI & Cost Estimation</h3>
            <p className="text-gray-600">
              Understand your investment with detailed cost analysis, return on investment, and payback period calculations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Feasibility Report</h3>
            <p className="text-gray-600">
              Receive comprehensive AI-generated reports with actionable recommendations and implementation strategies.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Trusted by Sustainability Leaders</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of environmentally conscious homeowners and businesses making data-driven decisions about water conservation.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg font-semibold text-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="w-6 h-6 text-teal-500" />
                <span className="text-xl font-bold text-white">JalMitra</span>
              </div>
              <p className="text-sm text-gray-400">
                Making rainwater harvesting accessible through technology and data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-teal-500 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-teal-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-teal-500 transition-colors">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-teal-500 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-teal-500 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-teal-500 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-teal-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-500 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-500 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 JalMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </div>
  )
}

export default Home