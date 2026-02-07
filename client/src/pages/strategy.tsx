import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Target, Compass, Brain } from "lucide-react";

export default function StrategyPage() {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold">Weekly Strategy</h1>
        <p className="text-muted-foreground">Adjust your plan based on last week's data.</p>
      </header>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Report Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Consistency</p>
              <p className="text-lg font-semibold">4/7 days</p>
              <p className="text-xs text-muted-foreground">Good Enough streak</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Craving trend</p>
              <p className="text-lg font-semibold">↓ 12%</p>
              <p className="text-xs text-muted-foreground">Late-night window improved</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-xs text-muted-foreground">Energy score</p>
              <p className="text-lg font-semibold">7.8/10</p>
              <p className="text-xs text-muted-foreground">Best on workout days</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adaptive Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Target className="text-primary mt-0.5" />
              <div>
                <p className="font-medium">Balanced mode targets</p>
                <p className="text-muted-foreground">Protein 95–115g • Steps 7–9k • Water 2.2–2.6L</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3">
              <Compass className="text-primary mt-0.5" />
              <div>
                <p className="font-medium">Timing guidance</p>
                <p className="text-muted-foreground">Anchor meal before 1pm, snack buffer 3–4pm.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border p-3 bg-muted/30">
              <Brain className="text-primary mt-0.5" />
              <div>
                <p className="font-medium">If you miss a target…</p>
                <p className="text-muted-foreground">Shift to Recovery mode and prioritize sleep + hydration.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Experiments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-secondary">
                <CheckCircle2 className="text-primary mt-0.5" />
                <div>
                    <h4 className="font-medium">High Protein Breakfast</h4>
                    <p className="text-sm text-muted-foreground">Aiming for 30g protein before 9am to reduce 3pm crash.</p>
                    <p className="text-xs text-muted-foreground mt-1">Success criteria: 4/5 weekdays completed.</p>
                </div>
             </div>
             <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <Circle className="text-muted-foreground mt-0.5" />
                <div>
                    <h4 className="font-medium">10min Walk After Lunch</h4>
                    <p className="text-sm text-muted-foreground">To improve digestion and reduce post-meal slump.</p>
                    <p className="text-xs text-muted-foreground mt-1">Success criteria: 3+ days logged.</p>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Review</CardTitle></CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Weekly review unlocks on Sunday evenings with updated targets.</p>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Decisioning & Transparency Loop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>1) Ingest new signals → 2) Update state → 3) Forecast windows → 4) Offer 1–3 actions.</p>
            <p>Every action includes a “why” factor + quick feedback to refine the next day.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
