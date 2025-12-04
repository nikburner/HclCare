import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, User, Activity, AlertCircle, CheckCircle2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import api from "@/services/api"

interface PatientDetailsData {
  profile: {
    name: string
    dob: string
    allergies: string[]
    medications: string[]
  }
  metrics: {
    date: string
    steps_count: number
    sleep_hours: number
    goal_met: boolean
  }[]
  compliance_status: string
}

export function PatientDetails() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<PatientDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const response = await api.get<PatientDetailsData>(`/provider/patients/${id}`)
        setData(response.data)
      } catch (err) {
        console.error(err)
        setError("Unable to load patient details.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      void loadDetails()
    }
  }, [id])

  if (loading) {
    return <div className="flex justify-center p-8">Loading patient details...</div>
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <p className="text-destructive">{error || "Patient not found"}</p>
        <Button asChild variant="outline">
          <Link to="/provider">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-8 py-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link to="/provider">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-primary">{data.profile.name}</h1>
          <p className="text-muted-foreground">Patient Details & History</p>
        </div>
        <div className="ml-auto">
          <span
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
              data.compliance_status === "Good"
                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
            }`}
          >
            {data.compliance_status === "Good" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {data.compliance_status === "Good" ? "On Track" : "Needs Attention"}
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-xl h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                <p className="text-base">{new Date(data.profile.dob).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {data.profile.allergies.length > 0 ? (
                  data.profile.allergies.map((allergy, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 text-xs font-medium border border-rose-200 dark:border-rose-900/30">
                      {allergy}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">None listed</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Medications</p>
              <div className="flex flex-wrap gap-2">
                {data.profile.medications.length > 0 ? (
                  data.profile.medications.map((med, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium border border-blue-200 dark:border-blue-900/30">
                      {med}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">None listed</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics History */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.metrics.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No activity logged yet.</p>
            ) : (
              <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium text-right">Steps</th>
                      <th className="px-4 py-3 font-medium text-right">Sleep</th>
                      <th className="px-4 py-3 font-medium text-center">Goal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {data.metrics.map((metric) => (
                      <tr key={metric.date} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {new Date(metric.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">{metric.steps_count.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right">{metric.sleep_hours}h</td>
                        <td className="px-4 py-3 text-center">
                          {metric.goal_met ? (
                            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" title="Goal Met" />
                          ) : (
                            <span className="inline-flex h-2 w-2 rounded-full bg-muted-foreground/30" title="Goal Not Met" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
