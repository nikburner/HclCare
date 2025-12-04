import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

type Role = "patient" | "provider"

type AuthState =
  | {
      token: string
      role: Role
    }
  | null

interface LoginResponse {
  token: string
  role: Role
}

interface AuthContextValue {
  user: AuthState
  isAuthenticated: boolean
  login: (data: LoginResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthState>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role") as Role | null
    if (token && role) {
      setUser({ token, role })
    }
  }, [])

  const login = useCallback((data: LoginResponse) => {
    localStorage.setItem("token", data.token)
    localStorage.setItem("role", data.role)
    setUser({ token: data.token, role: data.role })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


