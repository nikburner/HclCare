import { type FormEvent, useEffect, useState } from "react"
import { Activity, Moon, TrendingUp } from "lucide-react"

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

interface Metric {
  date: string
  steps_count: number
  sleep_hours: number
  goal_met: boolean
}

export function Dashboard() {
  const [steps, setSteps] = useState("")
  const [sleep, setSleep] = useState("")
  const [saving, setSaving] = useState(false)
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [error, setError] = useState<string | null>(null)

  const loadMetrics = async () => {
    try {
      const response = await api.get<Metric[]>("/metrics")
      setMetrics(response.data)
    } catch (err) {
      console.error(err)
      setError("Unable to load your recent metrics.")
    }
  }

  useEffect(() => {
    void loadMetrics()
  }, [])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await api.post("/metrics", {
        steps_count: Number(steps),
        sleep_hours: Number(sleep),
      })
      setSteps("")
      setSleep("")
      await loadMetrics()
    } catch (err) {
      console.error(err)
      setError("Unable to save today's metrics.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-8 py-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Patient Dashboard</h1>
          <p className="text-muted-foreground">Track your daily progress and health metrics</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)]">
        <Card className="h-fit border-white/10 bg-card/60 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Activity className="h-5 w-5 text-primary" />
              Log Today's Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="steps" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" /> Steps Count
                </Label>
                <Input
                  id="steps"
                  type="number"
                  min={0}
                  placeholder="e.g. 8000"
                  value={steps}
                  onChange={(event) => setSteps(event.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleep" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" /> Sleep (hours)
                </Label>
                <Input
                  id="sleep"
                  type="number"
                  min={0}
                  step="0.5"
                  placeholder="e.g. 7.5"
                  value={sleep}
                  onChange={(event) => setSleep(event.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>
              {error && (
                <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-md" role="alert">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={saving} className="w-full" variant="glow">
                {saving ? "Saving..." : "Save Metrics"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg">Recent History</CardTitle>
          </CardHeader>
          <CardContent>
            {metrics.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Activity className="h-12 w-12 opacity-20 mb-4" />
                <p>No metrics logged yet.</p>
                <p className="text-sm">Start tracking your health today!</p>
              </div>
            ) : (
              <div className="relative overflow-x-auto rounded-lg">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium text-right">Steps</th>
                      <th className="px-4 py-3 font-medium text-right">Sleep</th>
                      <th className="px-4 py-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {metrics.map((metric) => (
                      <tr key={metric.date} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          {new Date(metric.date).toLocaleDateString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-4 py-3 text-right font-mono">{metric.steps_count.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-mono">{metric.sleep_hours}h</td>
                        <td className="px-4 py-3 text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              metric.goal_met
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                            }`}
                          >
                            {metric.goal_met ? "Goal Met" : "Off Track"}
                          </span>
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


