import { useState } from "react";
import { Layout } from "@/components/layout";
import { ImpactCards } from "@/components/impact-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Sun, Moon, Battery, Utensils, Droplets } from "lucide-react";
import { useStore } from "@/lib/store";
import { Link } from "wouter";

export default function Dashboard() {
  const { settings } = useStore();
  const [dayQuality, setDayQuality] = useState<'Optimal' | 'Good Enough' | 'Recovery'>('Good Enough');

  return (
    <Layout>
      <header className="mb-6">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Good Morning, {settings.name}
        </h1>
        <p className="text-muted-foreground mt-1">
          Your twin suggests a <span className="font-semibold text-primary">{dayQuality} Day</span> based on your sleep.
        </p>
      </header>

      {/* Morning Plan / Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-primary/5 border-primary/20 md:col-span-2">
          <CardContent className="pt-6 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">Today's Focus: Stability</h3>
                  <p className="text-sm text-muted-foreground">Keep meals protein-forward to counteract yesterday's late snack.</p>
                </div>
                <div className="bg-background rounded-full p-2 shadow-sm">
                  <Battery className="text-primary w-5 h-5" />
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="rounded-full bg-background/50 border-primary/20 hover:bg-primary/10">
                  <Utensils className="w-4 h-4 mr-2 text-primary" />
                  Log Breakfast
                </Button>
                <Button variant="outline" size="sm" className="rounded-full bg-background/50 border-primary/20 hover:bg-primary/10">
                  <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                  Water
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">75%</div>
            <Progress value={75} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">Consistency Score</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Future Impact</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">View Timeline</Button>
        </div>
        
        <ImpactCards />
      </div>

      <div className="mt-8 grid gap-4">
        <h2 className="text-xl font-semibold">Recent Logs</h2>
        {/* Placeholder for logs list */}
        <Card className="border-dashed border-2 shadow-none bg-muted/20">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Plus className="text-muted-foreground" />
            </div>
            <p className="font-medium text-muted-foreground">No meals logged today</p>
            <Link href="/log">
              <Button variant="link" className="text-primary">Log your first meal</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
