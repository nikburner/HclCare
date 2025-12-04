import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Users, AlertCircle, CheckCircle2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import api from "@/services/api"

interface PatientSummary {
  _id: string
  name: string
  email: string
  compliant: boolean
}

export function ProviderDashboard() {
  const [patients, setPatients] = useState<PatientSummary[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get<PatientSummary[]>("/provider/patients")
        setPatients(response.data)
      } catch (err) {
        console.error(err)
        setError("Unable to load patient list.")
      }
    }

    void load()
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-8 py-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Provider Dashboard</h1>
          <p className="text-muted-foreground">Monitor patient compliance and health status</p>
        </div>
      </div>

      <Card className="border-white/10 bg-card/60 backdrop-blur-xl shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Assigned Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <p className="mb-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md flex items-center gap-2" role="alert">
              <AlertCircle className="h-4 w-4" />
              {error}
            </p>
          )}
          {patients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <Users className="h-12 w-12 opacity-20 mb-4" />
              <p>No patients assigned yet.</p>
            </div>
          ) : (
            <div className="relative overflow-x-auto rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Email</th>
                    <th className="px-6 py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patients.map((patient) => (
                    <tr key={patient.email} className="group hover:bg-muted/30 transition-colors relative">
                      <td className="px-6 py-4 font-medium">
                        <Link to={`/provider/patient/${patient._id}`} className="absolute inset-0 z-10" />
                        <span className="relative z-20 group-hover:text-primary transition-colors">{patient.name}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{patient.email}</td>
                      <td className="px-6 py-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            patient.compliant
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {patient.compliant ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <AlertCircle className="h-3.5 w-3.5" />
                          )}
                          {patient.compliant ? "On Track" : "Needs Attention"}
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
  )
}


