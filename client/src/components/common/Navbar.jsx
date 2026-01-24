import React, { useState } from 'react'
import { Search, ChevronDown, Menu, X, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import logo from '../../assets/logo.png'
import navDecoration from '../../assets/nav-decoration.png'
import { logout } from '../../features/auth/store/authSlice'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const navItems = [
    { name: 'Explore', hasDropdown: true, path: '/courses' },
    // Only show "Become Instructor" if not logged in or if user is a student
    ...(!user || user.role === 'student' ? [{ name: 'Become Instructor', hasDropdown: false, path: '/instructor-signup' }] : []),
    { name: 'Courses', hasDecoration: true, path: '/courses' },
    // Show appropriate dashboard based on role
    ...(user?.role === 'instructor' 
        ? [{ name: 'Instructor Dashboard', hasDropdown: false, path: '/instructor-dashboard' }] 
        : [{ name: 'Dashboard', hasDropdown: false, path: '/dashboard' }]
    ),
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-6 lg:pt-8 xl:pt-10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 z-20">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <span className="ml-2 text-xl font-bold text-white italic">Kattraan</span>
        </Link>

        {/* Desktop Navigation Pill */}
        <div 
          className="hidden lg:flex items-center justify-between px-1.5 py-1 absolute left-1/2 -translate-x-1/2 z-10 w-auto min-w-[850px] backdrop-blur-md rounded-full border border-white/10 shadow-2xl"
          style={{ background: 'linear-gradient(91.43deg, rgba(217, 217, 217, 0.28) 1.92%, rgba(217, 217, 217, 0.06) 102.33%)' }}
        >
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 text-white/70 whitespace-nowrap transition-all duration-300 relative font-medium text-[15px] hover:text-white`}
              >
                {item.name}
                {item.hasDecoration && (
                  <img src={navDecoration} alt="Sparkle" className="absolute -top-1 -right-2 h-3 w-3 brightness-125" />
                )}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </div>
          
          {/* Search Input */}
          <div className="flex items-center relative mr-6 ml-4">
            <Search className="h-4 w-4 text-white/40 z-10" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-2 pr-2 py-0.5 bg-transparent border-b border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/40 w-32 transition-all text-sm font-light"
            />
          </div>
        </div>

        {/* Login & Sign Up / Profile */}
        <div className="hidden lg:flex items-center gap-3 z-20">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white/90 hover:text-white px-4 py-2 text-sm font-medium">Login</Link>
              <Link to="/signup" className="flex items-center gap-2 bg-gradient-to-r from-primary-pink to-primary-purple text-white px-6 py-2 rounded-full font-medium text-sm hover:opacity-90 shadow-lg">
                <User className="w-4 h-4" /> Sign Up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm">Hi, {user?.name || 'Scholar'}</span>
              <button 
                onClick={handleLogout}
                className="bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-white/20 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden ml-auto z-20">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0c091a] p-6 lg:hidden border-t border-white/10 z-50">
            <div className="flex flex-col gap-4">
                {navItems.map(item => (
                    <Link key={item.name} to={item.path} className="text-white/80 hover:text-white text-lg font-medium">{item.name}</Link>
                ))}
                {!isAuthenticated ? (
                  <Link to="/login" className="text-white/80 hover:text-white text-lg font-medium">Login</Link>
                ) : (
                  <button onClick={handleLogout} className="text-left text-white/80 hover:text-white text-lg font-medium">Logout</button>
                )}
            </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
