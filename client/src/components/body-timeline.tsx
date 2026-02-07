import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function BodyTimeline() {
  const events = [
    { time: '08:00', label: 'Breakfast', type: 'meal', confidence: 'high' },
    { time: '10:30', label: 'Energy Dip', type: 'prediction', confidence: 'medium' },
    { time: '12:00', label: 'Lunch', type: 'meal', confidence: 'high' },
    { time: '15:00', label: 'Cravings Risk', type: 'prediction', confidence: 'low' },
    { time: '18:00', label: 'Dinner', type: 'meal', confidence: 'high' },
    { time: '22:00', label: 'Sleep', type: 'sleep', confidence: 'high' },
  ];

  const trendLayers = [
    { label: "Water retention", value: 60, color: "bg-blue-400/70" },
    { label: "Fat trend", value: 45, color: "bg-emerald-400/70" },
    { label: "Muscle preservation", value: 75, color: "bg-purple-400/70" },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Body Timeline</h3>
        <span className="text-xs text-muted-foreground">Confidence bands shown as dashed nodes</span>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-xl border bg-card p-4">
        <div className="flex w-max space-x-8 p-4">
          {events.map((event, i) => (
            <div key={i} className="flex flex-col items-center gap-2 relative group">
              {/* Line connector */}
              {i < events.length - 1 && (
                <div className="absolute top-3 left-[50%] w-[calc(100%+32px)] h-0.5 bg-border -z-10" />
              )}
              
              <div className={cn(
                "w-6 h-6 rounded-full border-4 bg-background z-10 transition-colors",
                event.type === 'prediction' ? "border-accent" : "border-primary",
                event.confidence === 'low' && "border-dashed"
              )} />
              
              <div className="text-center">
                <span className="text-xs font-mono text-muted-foreground block mb-1">{event.time}</span>
                <span className="text-sm font-medium block">{event.label}</span>
                {event.confidence === 'low' && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded">Uncertain</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="mt-4 grid gap-3 rounded-xl border bg-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Trend layering</p>
          <span className="text-xs text-muted-foreground">7-day blended view</span>
        </div>
        <div className="space-y-3">
          {trendLayers.map((layer) => (
            <div key={layer.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{layer.label}</span>
                <span>{layer.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className={`h-2 rounded-full ${layer.color}`} style={{ width: `${layer.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
