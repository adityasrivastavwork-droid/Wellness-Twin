import { motion } from "framer-motion";
import { Zap, Brain, Moon, ArrowRight, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Prediction {
  timeframe: string;
  score: number; // 0-100
  label: string;
  confidence: 'High' | 'Medium' | 'Low';
  factors: string[];
}

export function ImpactCards() {
  // Mock predictions based on "offline inference"
  const predictions: Prediction[] = [
    {
      timeframe: "Next 4 Hours",
      score: 45,
      label: "Energy Dip Likely",
      confidence: "High",
      factors: ["Poor sleep last night", "High carb breakfast"]
    },
    {
      timeframe: "Tomorrow Morning",
      score: 80,
      label: "High Readiness",
      confidence: "Medium",
      factors: ["Recovery trend improving"]
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
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
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {pred.timeframe}
              </CardTitle>
              <Badge variant="outline" className={cn(
                "text-[10px] px-2 py-0.5 h-auto font-normal",
                pred.confidence === 'Low' && "border-amber-200 text-amber-700 bg-amber-50"
              )}>
                {pred.confidence} Confidence
              </Badge>
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
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
