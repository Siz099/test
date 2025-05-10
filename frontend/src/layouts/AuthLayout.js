"use client"

import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import "../styles/AuthLayout.css"

const AuthLayout = () => {
  const location = useLocation()
  const [transitionClass, setTransitionClass] = useState("")
  const [prevPath, setPrevPath] = useState(location.pathname)

  useEffect(() => {
    // Skip animation on initial load
    if (prevPath === location.pathname) return

    // Determine direction of transition
    const isGoingToRegister = location.pathname === "/register"

    // Set the appropriate transition class
    setTransitionClass(isGoingToRegister ? "slide-left" : "slide-right")

    // Store current path for next comparison
    setPrevPath(location.pathname)

    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      setTransitionClass("")
    }, 500)

    return () => clearTimeout(timer)
  }, [location.pathname, prevPath])

  return (
    <div className="auth-layout">
      <div className={`auth-container ${transitionClass}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
