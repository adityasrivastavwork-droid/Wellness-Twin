import { motion } from "framer-motion";
import { Brain, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Prediction {
  timeframe: string;
  score: number; // 0-100
  label: string;
  confidence: 'High' | 'Medium' | 'Low';
  range: string;
  factors: string[];
  guidance: string;
}

export function ImpactCards() {
  // Mock predictions based on "offline inference"
  const predictions: Prediction[] = [
    {
      timeframe: "Next 24 Hours",
      score: 62,
      label: "Steady Energy Window",
      confidence: "Medium",
      range: "Energy 55–70",
      factors: ["Balanced lunch yesterday", "Moderate steps", "Evening stress trending down"],
      guidance: "Keep dinner protein-forward to extend the stable window."
    },
    {
      timeframe: "Next 72 Hours",
      score: 48,
      label: "Craving Risk Window",
      confidence: "Low",
      range: "Craving risk 40–60",
      factors: ["Sleep debt building", "Late caffeine", "High-carb snack pattern"],
      guidance: "Plan a 3pm protein snack + hydrate before cravings peak."
    },
    {
      timeframe: "Next 7 Days",
      score: 74,
      label: "Recovery Trending Up",
      confidence: "High",
      range: "Readiness 68–82",
      factors: ["Workout load steady", "Weekend recovery time", "Stress baseline improving"],
      guidance: "Keep two low-intensity days to protect the trend."
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {predictions.map((pred, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className={cn(
            "border-l-4 overflow-hidden relative",
            pred.score > 70 ? "border-l-emerald-500" : pred.score < 50 ? "border-l-amber-500" : "border-l-blue-500"
          )}>
            <div className={cn(
              "absolute inset-0 opacity-5 pointer-events-none",
              pred.score > 70 ? "bg-emerald-500" : pred.score < 50 ? "bg-amber-500" : "bg-blue-500"
            )} />
            <CardHeader className="pb-2 flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {pred.timeframe}
                </CardTitle>
                <Badge variant="outline" className={cn(
                  "text-[10px] px-2 py-0.5 h-auto font-normal",
                  pred.confidence === 'Low' && "border-amber-200 text-amber-700 bg-amber-50"
                )}>
                  {pred.confidence} Confidence
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{pred.range}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-display font-semibold flex items-center gap-2">
                    {pred.label}
                    {pred.score > 70 ? <TrendingUp className="text-emerald-500 h-5 w-5" /> : <TrendingDown className="text-amber-500 h-5 w-5" />}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">WHY?</p>
                <div className="flex flex-wrap gap-2">
                  {pred.factors.map((factor, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      <Brain size={12} />
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                <AlertCircle className="mt-0.5 h-4 w-4 text-primary" />
                <span>{pred.guidance}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
