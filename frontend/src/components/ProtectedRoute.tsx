import type { ReactNode } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "@/context/AuthContext"

interface ProtectedRouteProps {
  children?: ReactNode
  requiredRole?: "patient" | "provider"
  allowedRoles?: ("patient" | "provider")[]
}

export function ProtectedRoute({
  children,
  requiredRole,
  allowedRoles,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath = user?.role === "provider" ? "/provider" : "/dashboard"
    return <Navigate to={redirectPath} replace />
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    const redirectPath = user?.role === "provider" ? "/provider" : "/dashboard"
    return <Navigate to={redirectPath} replace />
  }

  return children ? <>{children}</> : <Outlet />
}


