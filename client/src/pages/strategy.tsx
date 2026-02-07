import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

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
            <CardTitle>Current Experiments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-secondary">
                <CheckCircle2 className="text-primary mt-0.5" />
                <div>
                    <h4 className="font-medium">High Protein Breakfast</h4>
                    <p className="text-sm text-muted-foreground">Aiming for 30g protein before 9am to reduce 3pm crash.</p>
                </div>
             </div>
             <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <Circle className="text-muted-foreground mt-0.5" />
                <div>
                    <h4 className="font-medium">10min Walk After Lunch</h4>
                    <p className="text-sm text-muted-foreground">To improve digestion and reduce post-meal slump.</p>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader><CardTitle>Review</CardTitle></CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Weekly review unlocks on Sunday evenings.</p>
            </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
