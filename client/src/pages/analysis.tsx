import { Layout } from "@/components/layout";
import { HungerHeatmap } from "@/components/hunger-heatmap";
import { BodyTimeline } from "@/components/body-timeline";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

export default function AnalysisPage() {
  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold">Analysis</h1>
        <p className="text-muted-foreground">Deep dive into your metabolic patterns.</p>
      </header>

      <div className="space-y-8">
        <BodyTimeline />

        <div className="grid gap-6 md:grid-cols-2">
          <HungerHeatmap />

          <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle>Cycle Overlay</CardTitle>
                 <CardDescription>Opt-in insights for energy and cravings.</CardDescription>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-xs text-muted-foreground">Opt-in</span>
                 <Switch defaultChecked />
               </div>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="h-40 rounded-lg bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
                 Cycle phase trend preview (real data ready)
               </div>
               <div className="grid gap-2 text-xs text-muted-foreground">
                 <div className="flex items-center justify-between">
                   <span>Follicular → energy lift</span>
                   <span className="inline-flex items-center gap-1 text-emerald-600"><TrendingUp className="h-3 w-3" /> +8%</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span>Luteal → craving risk</span>
                   <span className="inline-flex items-center gap-1 text-amber-600"><TrendingDown className="h-3 w-3" /> +12%</span>
                 </div>
               </div>
             </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Weekly Response Score</h2>
          <div className="grid gap-4 md:grid-cols-3">
              <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Energy</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">8.4/10</div></CardContent>
              </Card>
              <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Satiety</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">7.2/10</div></CardContent>
              </Card>
              <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Mood</CardTitle></CardHeader>
                  <CardContent><div className="text-2xl font-bold">9.0/10</div></CardContent>
              </Card>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Meal-level Response + Smart Swaps</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                meal: "Oatmeal & berries",
                score: "7.5/10",
                note: "Sustained energy, mild mid-morning hunger.",
                swap: "Add Greek yogurt for protein",
              },
              {
                meal: "Chicken bowl",
                score: "8.8/10",
                note: "High satiety + stable mood.",
                swap: "Keep as anchor meal",
              },
              {
                meal: "Late-night cookies",
                score: "5.4/10",
                note: "Energy spike then crash.",
                swap: "Swap to dark chocolate + berries",
              },
              {
                meal: "Smoothie",
                score: "6.3/10",
                note: "Quick energy but hungry sooner.",
                swap: "Add chia + nut butter",
              },
            ].map((item) => (
              <Card key={item.meal}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.meal}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response score</span>
                    <span className="font-semibold">{item.score}</span>
                  </div>
                  <p className="text-muted-foreground">{item.note}</p>
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Smart swap: {item.swap}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
