import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function HungerHeatmap() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const times = ['Morning', 'Midday', 'Evening', 'Night'];

  // Mock data: 0 = low hunger, 10 = high trigger risk
  const data = [
    [2, 3, 4, 1], // Mon
    [2, 8, 3, 2], // Tue (Midday spike)
    [3, 4, 2, 1], // Wed
    [2, 5, 8, 4], // Thu (Evening spike)
    [1, 2, 9, 5], // Fri (Evening spike)
    [1, 1, 3, 2], // Sat
    [1, 2, 2, 1], // Sun
  ];

  const getColor = (val: number) => {
    if (val >= 8) return 'bg-destructive/80 text-destructive-foreground';
    if (val >= 5) return 'bg-amber-400/80 text-amber-900';
    if (val >= 3) return 'bg-primary/40 text-primary-foreground';
    return 'bg-muted/50 text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Hunger Map
          <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded-full">Pro Feature Preview</span>
        </CardTitle>
        <CardDescription>
          Identify your recurring craving zones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {/* Y Axis Labels */}
          <div className="grid grid-rows-7 gap-1 text-xs font-medium text-muted-foreground py-1">
            {days.map(d => <div key={d} className="flex items-center justify-center h-8 w-6">{d}</div>)}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-1">
            {/* X Axis Labels (Hidden structurally but could be added above) */}
            
            {data.map((row, dayIdx) => (
              row.map((val, timeIdx) => (
                <TooltipProvider key={`${dayIdx}-${timeIdx}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`h-8 rounded-sm ${getColor(val)} transition-all hover:scale-105 cursor-help`}></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs font-medium">{days[dayIdx]} {times[timeIdx]}: Level {val}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] gap-1 mt-2 text-[10px] text-muted-foreground text-center">
          <div></div>
          {times.map(t => <div key={t}>{t}</div>)}
        </div>
      </CardContent>
    </Card>
  );
}
