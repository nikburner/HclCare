import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Landing() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-16 py-20">
      <section className="flex max-w-4xl flex-col items-center gap-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-4">
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl text-primary drop-shadow-sm">
            Health tracking, reimagined.
          </h1>
          <p className="mx-auto max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl leading-relaxed">
            Experience the future of health monitoring. Simple, elegant, and powerful tools for patients and providers.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" variant="glow" className="rounded-full text-lg h-14 px-8">
            <Link to="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full text-lg h-14 px-8 border-primary/20 hover:bg-primary/5">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </section>

      <section className="grid w-full max-w-5xl gap-6 sm:grid-cols-3 px-4">
        {[
          {
            title: "For Patients",
            desc: "Effortless daily tracking. Beautiful insights into your health journey.",
            icon: "🏃‍♂️"
          },
          {
            title: "For Providers",
            desc: "Real-time patient monitoring with powerful analytics and alerts.",
            icon: "👨‍⚕️"
          },
          {
            title: "Privacy First",
            desc: "Your health data is encrypted and secure. You stay in control.",
            icon: "🔒"
          }
        ].map((feature, i) => (
          <Card key={i} className="group hover:-translate-y-1 transition-transform duration-300">
            <CardContent className="space-y-4 py-8">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h2 className="text-xl font-semibold text-primary">
                {feature.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}


