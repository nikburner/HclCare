import { FormEvent, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/services/api"

interface ProfileData {
  name: string
  dob: string
  allergies: string
  medications: string
}

export function Profile() {
  const [form, setForm] = useState<ProfileData>({
    name: "",
    dob: "",
    allergies: "",
    medications: "",
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true)
      try {
        const response = await api.get<ProfileData>("/profile")
        setForm(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    void loadProfile()
  }, [])

  const handleChange =
    (field: keyof ProfileData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)
    try {
      await api.post("/profile", form)
      setMessage("Profile updated.")
    } catch (err) {
      console.error(err)
      setMessage("Unable to save your profile.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-1 items-start justify-center py-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Patient profile</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-xs text-muted-foreground">Loading profile…</p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={handleChange("name")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dob">Date of birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange("dob")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  value={form.allergies}
                  onChange={handleChange("allergies")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="medications">Medications</Label>
                <Input
                  id="medications"
                  value={form.medications}
                  onChange={handleChange("medications")}
                />
              </div>
              {message && (
                <p className="text-xs text-muted-foreground">{message}</p>
              )}
              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


