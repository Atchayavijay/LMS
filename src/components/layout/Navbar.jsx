import React, { useState } from 'react'
import { Search, ChevronDown, Menu, X, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import navDecoration from '../../assets/nav-decoration.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)

  const navItems = [
    { name: 'Explore', hasDropdown: true, path: '#' },
    { name: 'Home', hasDropdown: false, path: '/' },
    { name: 'Courses', hasDecoration: true, path: '#' },
    { name: 'My learnings', hasDropdown: false, path: '#' },
    { name: 'Help & Support', hasDropdown: false, path: '#' },
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-6 lg:pt-8 xl:pt-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative flex items-center justify-between">
        {/* Logo - Always on the left */}
        <Link to="/" className="flex items-center flex-shrink-0 z-20">
          <img
            src={logo}
            alt="Kattraan Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-bold text-white">
            Kattraan
          </span>
        </Link>

        {/* Desktop Navigation Pill */}
        <div className="hidden lg:flex items-center justify-between px-2 py-2 pl-4 pr-4 lg:pl-2 lg:pr-6 absolute left-1/2 -translate-x-1/2 z-10 w-auto lg:w-[700px] max-w-[90vw] bg-transparent">
            <div className="flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => {
              const isExplore = item.name === 'Explore'
              
              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && setIsExploreOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setIsExploreOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-1 text-white/90 whitespace-nowrap transition-all duration-300 relative font-satoshi font-normal text-sm lg:text-[16px] leading-none tracking-normal ${
                      isExplore 
                        ? 'bg-white/10 hover:bg-white/20 rounded-[20px] px-3 py-1.5 lg:px-5 lg:py-2' 
                        : 'hover:text-white'
                    }`}
                  >
                        {item.name}
                        
                        {item.hasDecoration && (
                          <img
                            src={navDecoration}
                            alt="Sparkle"
                            className="absolute -top-1 -right-2 h-2.5 w-2.5"
                          />
                        )}

                        {item.hasDropdown && (
                          <ChevronDown className={`h-4 w-4 ml-1 opacity-70`} />
                        )}
                  </Link>
                </div>
              )
            })}
            </div>
          
          {/* Search Input */}
          <div className="flex items-center relative ml-4 lg:ml-6">
            <Search className="absolute left-0 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-7 pr-2 py-1 bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-white/50 w-24 lg:w-36 transition-all font-satoshi font-normal text-sm lg:text-[16px] leading-none tracking-normal"
            />
          </div>
        </div>

        {/* Login & Sign Up Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-3 z-20">
          <Link 
            to="/login"
            className="flex items-center gap-2 text-white/90 hover:text-white px-4 py-2 font-medium text-sm transition-all"
          >
            Login
          </Link>
          <Link 
            to="/signup"
            className="flex items-center gap-2 bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-primary-pink/20"
          >
            <User className="w-4 h-4" />
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Toggle - Pushed to right */}
        <div className="lg:hidden ml-auto z-20">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0c091a] p-6 lg:hidden border-t border-white/10 z-50">
            <div className="flex flex-col gap-4">
                {navItems.map(item => (
                    <Link key={item.name} to={item.path} className="text-white/80 hover:text-white text-lg font-medium">{item.name}</Link>
                ))}
                <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
                  <Link to="/login" className="text-white/80 hover:text-white text-lg font-medium">Login</Link>
                  <Link to="/signup" className="bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-2 rounded-full font-medium text-center shadow-lg shadow-primary-pink/20">Sign Up</Link>
                </div>
            </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
