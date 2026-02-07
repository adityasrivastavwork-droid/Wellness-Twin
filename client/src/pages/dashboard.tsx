import { useState } from "react";
import { Layout } from "@/components/layout";
import { ImpactCards } from "@/components/impact-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Sun, Moon, Battery, Utensils, Droplets, Sparkles, Target, Wand2, Scale } from "lucide-react";
import { useStore } from "@/lib/store";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { settings, addLog } = useStore();
  const { toast } = useToast();
  const [dayQuality, setDayQuality] = useState<'Optimal' | 'Good Enough' | 'Recovery'>('Good Enough');
  const [mealName, setMealName] = useState("");
  const [hungerLevel, setHungerLevel] = useState([3]);
  const [waterAmount, setWaterAmount] = useState("500");
  const [weightEntry, setWeightEntry] = useState("");

  const handleQuickLog = (type: 'meal' | 'hunger' | 'water' | 'weight') => {
    const payloadMap = {
      meal: { name: mealName },
      hunger: { level: hungerLevel[0] },
      water: { amountMl: Number(waterAmount) },
      weight: { weight: weightEntry },
    } as const;

    addLog({
      timestamp: new Date().toISOString(),
      type,
      value: payloadMap[type],
    });

    toast({
      title: "Logged",
      description: "Saved to your timeline.",
    });
  };

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
                <Link href="#quick-log">
                  <Button variant="outline" size="sm" className="rounded-full bg-background/50 border-primary/20 hover:bg-primary/10">
                    <Utensils className="w-4 h-4 mr-2 text-primary" />
                    Quick log
                  </Button>
                </Link>
                <Link href="/log">
                  <Button variant="outline" size="sm" className="rounded-full bg-background/50 border-primary/20 hover:bg-primary/10">
                    <Droplets className="w-4 h-4 mr-2 text-blue-500" />
                    Full log
                  </Button>
                </Link>
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

      <div id="quick-log" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Quick Log</h2>
          <Link href="/log">
            <Button variant="ghost" size="sm" className="text-muted-foreground">Open full logger</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Utensils className="h-4 w-4 text-primary" /> Meal + Hunger</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="What did you eat?"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
              <div>
                <p className="text-xs text-muted-foreground mb-2">Hunger before (1–5)</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-6">{hungerLevel}</span>
                  <Slider value={hungerLevel} onValueChange={setHungerLevel} min={1} max={5} step={1} className="flex-1" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => handleQuickLog('meal')} disabled={!mealName}>
                  Save meal
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => handleQuickLog('hunger')}>
                  Save hunger
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2"><Droplets className="h-4 w-4 text-blue-500" /> Water + Weight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-1"><Droplets className="h-3 w-3" /> Water (ml)</label>
                  <Input value={waterAmount} onChange={(e) => setWaterAmount(e.target.value)} placeholder="500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-1"><Scale className="h-3 w-3" /> Weight</label>
                  <Input value={weightEntry} onChange={(e) => setWeightEntry(e.target.value)} placeholder="70 kg" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" variant="secondary" onClick={() => handleQuickLog('water')}>
                  Save water
                </Button>
                <Button size="sm" className="flex-1" variant="outline" onClick={() => handleQuickLog('weight')}>
                  Save weight
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Future Impact</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">View Timeline</Button>
        </div>
        
        <ImpactCards />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Daily Calibration Loop</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-4 bg-muted/30">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sun className="h-4 w-4 text-amber-500" />
                Morning Plan
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Set 1–2 priority actions + confirm your energy forecast.
              </p>
              <Button variant="outline" size="sm" className="mt-3">Confirm morning target</Button>
            </div>
            <div className="rounded-xl border p-4 bg-muted/30">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Moon className="h-4 w-4 text-indigo-500" />
                Evening Reflection
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Rate the day and log one micro-adjustment for tomorrow.
              </p>
              <Button variant="outline" size="sm" className="mt-3">Share reflection</Button>
            </div>
            <div className="md:col-span-2 rounded-xl border p-4 bg-primary/5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Target className="h-4 w-4 text-primary" />
                Calibration question
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Did the 3pm craving window show up today? Your answer refines tomorrow's prediction.
              </p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="secondary">Yes</Button>
                <Button size="sm" variant="outline">No</Button>
                <Button size="sm" variant="ghost">Not sure</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Good Enough Nudges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <Sparkles className="h-4 w-4 text-primary mt-0.5" />
              <span>Recovery day: prioritize hydration and a 15-minute walk.</span>
            </div>
            <div className="flex gap-2">
              <Wand2 className="h-4 w-4 text-primary mt-0.5" />
              <span>Small win: add one fiber-rich snack to keep cravings steady.</span>
            </div>
          </CardContent>
        </Card>
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
