import { Layout } from "@/components/layout";
import { HungerHeatmap } from "@/components/hunger-heatmap";
import { BodyTimeline } from "@/components/body-timeline";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";

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
          
          <Card className="relative overflow-hidden">
             {/* Paywall Overlay Mockup */}
             <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Lock className="text-primary w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Unlock Cycle Insights</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-xs">See how your cycle phases impact energy and cravings. Included in Pro.</p>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">Upgrade to Pro</button>
             </div>
             
             <CardHeader>
               <CardTitle>Cycle Overlay</CardTitle>
               <CardDescription>Correlation between phases and energy.</CardDescription>
             </CardHeader>
             <CardContent className="h-48 flex items-center justify-center bg-muted/20">
               <span className="text-muted-foreground text-sm">Chart Preview Hidden</span>
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
      </div>
    </Layout>
  );
}
