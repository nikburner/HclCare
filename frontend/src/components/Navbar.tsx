import { Link, useLocation, useNavigate } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path: string) =>
    location.pathname === path ? "text-foreground" : "text-muted-foreground"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            HCL Care
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {!isAuthenticated && (
            <>
              <Link 
                to="/login" 
                className={`transition-colors hover:text-primary ${isActive("/login")}`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`transition-colors hover:text-primary ${isActive("/register")}`}
              >
                Register
              </Link>
            </>
          )}
          {isAuthenticated && user?.role === "patient" && (
            <>
              <Link 
                to="/dashboard" 
                className={`transition-colors hover:text-primary ${isActive("/dashboard")}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/profile" 
                className={`transition-colors hover:text-primary ${isActive("/profile")}`}
              >
                Profile
              </Link>
            </>
          )}
          {isAuthenticated && user?.role === "provider" && (
            <Link 
              to="/provider" 
              className={`transition-colors hover:text-primary ${isActive("/provider")}`}
            >
              Provider
            </Link>
          )}
          {isAuthenticated && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleLogout}
              className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
            >
              Logout
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}


