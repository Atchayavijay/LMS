import React, { useState } from 'react'
import { Search, ChevronDown, Menu, X, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../assets/logo.png'
import navDecoration from '../../assets/nav-decoration.png'
import { logout } from '../../features/auth/store/authSlice'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExploreOpen, setIsExploreOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const navItems = [
    { name: 'Explore', hasDropdown: true, path: '/courses' },
    { name: 'Home', hasDropdown: false, path: '/' },
    { name: 'Courses', hasDecoration: true, path: '/courses' },
    { name: 'My learnings', hasDropdown: false, path: '/dashboard' },
    { name: 'Help & Support', hasDropdown: false, path: '#' },
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-6 lg:pt-8 xl:pt-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 z-20">
          <img
            src={logo}
            alt="Kattraan Logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 text-xl font-bold text-white italic">
            Kattraan
          </span>
        </Link>

        {/* Desktop Navigation Pill */}
        <div 
          className="hidden lg:flex items-center justify-start gap-12 px-1 py-[0.5px] absolute left-1/2 -translate-x-1/2 z-10 w-auto min-w-[700px] backdrop-blur-[20px] rounded-full border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/[0.1]"
        >
          <div className="flex items-center gap-8 pl-1 text-[13px]">
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
                    className={`flex items-center justify-between whitespace-nowrap transition-all duration-300 relative font-medium text-[14px] tracking-wide ${
                      isExplore 
                        ? 'bg-black text-white rounded-full px-6 py-1.5 min-w-[120px] shadow-lg flex items-center gap-4 hover:bg-black/90' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                    
                    {item.hasDecoration && (
                      <img
                        src={navDecoration}
                        alt="Sparkle"
                        className="absolute -top-1.5 -right-3 h-3.5 w-2.5"
                      />
                    )}

                    {item.hasDropdown && (
                      <ChevronDown className={`h-4 w-4 text-white ${isExplore ? 'opacity-100' : 'opacity-60'}`} />
                    )}
                  </Link>
                </div>
              )
            })}
          </div>
          
          {/* Search Input */}
          <div className="flex items-center relative gap-2 group/search">
            <Search className="h-4 w-4 text-white/20 group-focus-within/search:text-white/40 transition-colors" />
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-white placeholder-white/20 focus:outline-none w-44 text-[13px] font-light py-1 border-b border-white/[0.05] focus:border-white/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Desktop User Actions */}
        <div className="hidden lg:flex items-center gap-3 z-20">
          {!isAuthenticated ? (
            <>
              <Link 
                to="/login"
                className="text-white/90 hover:text-white px-4 py-2 font-medium text-sm transition-all"
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
            </>
          ) : (
             <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <span className="text-white font-bold text-xs">Hi, {user?.name?.split(' ')[0] || 'Scholar'}</span>
                    <button 
                        onClick={handleLogout}
                        className="text-[10px] text-primary-pink font-bold uppercase tracking-widest hover:underline"
                    >
                        Logout
                    </button>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-pink/20 to-primary-purple/20 border border-white/10 flex items-center justify-center text-white shadow-xl">
                    <User size={20} />
                </div>
             </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
            </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
