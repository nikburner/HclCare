import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import api from "@/services/api"

export function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"patient" | "provider">("patient")
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!consent) {
      setError("You need to agree to data use to continue.")
      return
    }

    setLoading(true)
    setError(null)
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        role,
        consent_agreed: consent,
      })
      const data = response.data as { token: string; role: "patient" | "provider" }
      login(data)

      if (data.role === "provider") {
        navigate("/provider", { replace: true })
      } else {
        navigate("/dashboard", { replace: true })
      }
    } catch (err) {
      console.error(err)
      setError("Unable to create that account.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
      <Card className="w-full max-w-md border-white/10 bg-card/60 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-primary">Create Account</CardTitle>
          <p className="text-sm text-muted-foreground">Join us to start your health journey</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label>Role</Label>
              <div className="flex gap-3 text-sm">
                <button
                  type="button"
                  className={`rounded-md border px-3 py-1 ${
                    role === "patient"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground"
                  }`}
                  onClick={() => setRole("patient")}
                >
                  Patient
                </button>
                <button
                  type="button"
                  className={`rounded-md border px-3 py-1 ${
                    role === "provider"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground"
                  }`}
                  onClick={() => setRole("provider")}
                >
                  Provider
                </button>
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              I agree to share my health data for care and monitoring.
            </label>
            {error && (
              <p className="text-xs text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


