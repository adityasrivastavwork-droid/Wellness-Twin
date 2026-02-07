import { cn } from "@/lib/utils";

const MUSCLE_LABELS: Record<string, string> = {
  chest: "Chest",
  shoulders: "Shoulders",
  biceps: "Biceps",
  triceps: "Triceps",
  core: "Core",
  back: "Back",
  glutes: "Glutes",
  quads: "Quads",
  hamstrings: "Hamstrings",
  calves: "Calves",
};

interface BodyMap3DProps {
  highlightedMuscles: string[];
}

export function BodyMap3D({ highlightedMuscles }: BodyMap3DProps) {
  const isActive = (muscle: string) => highlightedMuscles.includes(muscle);

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">3D Muscle Preview</p>
          <p className="text-xs text-muted-foreground">Highlights update based on selected exercise.</p>
        </div>
        <div className="text-[10px] text-muted-foreground">Preview</div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] items-center">
        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-primary/10 via-transparent to-primary/5 blur-xl" />
          <svg
            viewBox="0 0 220 420"
            className="relative z-10 w-full drop-shadow-md"
            role="img"
            aria-label="3D human muscle map preview"
          >
            <defs>
              <linearGradient id="bodyShade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f5f3ff" />
                <stop offset="60%" stopColor="#ede9fe" />
                <stop offset="100%" stopColor="#e0e7ff" />
              </linearGradient>
            </defs>
            <rect x="70" y="20" width="80" height="80" rx="36" fill="url(#bodyShade)" />
            <rect x="60" y="95" width="100" height="120" rx="40" fill="url(#bodyShade)" />
            <rect x="35" y="105" width="28" height="110" rx="14" fill="url(#bodyShade)" />
            <rect x="157" y="105" width="28" height="110" rx="14" fill="url(#bodyShade)" />
            <rect x="70" y="215" width="30" height="160" rx="16" fill="url(#bodyShade)" />
            <rect x="120" y="215" width="30" height="160" rx="16" fill="url(#bodyShade)" />

            <rect x="72" y="110" width="76" height="30" rx="14" className={cn("transition-all", isActive("chest") ? "fill-primary" : "fill-primary/25")} />
            <rect x="62" y="100" width="22" height="22" rx="10" className={cn("transition-all", isActive("shoulders") ? "fill-indigo-500" : "fill-indigo-300")} />
            <rect x="136" y="100" width="22" height="22" rx="10" className={cn("transition-all", isActive("shoulders") ? "fill-indigo-500" : "fill-indigo-300")} />
            <rect x="45" y="135" width="18" height="30" rx="8" className={cn("transition-all", isActive("biceps") ? "fill-emerald-500" : "fill-emerald-300")} />
            <rect x="157" y="135" width="18" height="30" rx="8" className={cn("transition-all", isActive("biceps") ? "fill-emerald-500" : "fill-emerald-300")} />
            <rect x="45" y="170" width="18" height="30" rx="8" className={cn("transition-all", isActive("triceps") ? "fill-teal-500" : "fill-teal-300")} />
            <rect x="157" y="170" width="18" height="30" rx="8" className={cn("transition-all", isActive("triceps") ? "fill-teal-500" : "fill-teal-300")} />
            <rect x="80" y="145" width="60" height="40" rx="18" className={cn("transition-all", isActive("core") ? "fill-amber-500" : "fill-amber-300")} />
            <rect x="80" y="185" width="60" height="22" rx="10" className={cn("transition-all", isActive("core") ? "fill-amber-500" : "fill-amber-200")} />
            <rect x="78" y="210" width="64" height="24" rx="12" className={cn("transition-all", isActive("glutes") ? "fill-rose-500" : "fill-rose-300")} />
            <rect x="72" y="235" width="26" height="68" rx="12" className={cn("transition-all", isActive("quads") ? "fill-violet-500" : "fill-violet-300")} />
            <rect x="122" y="235" width="26" height="68" rx="12" className={cn("transition-all", isActive("quads") ? "fill-violet-500" : "fill-violet-300")} />
            <rect x="72" y="303" width="26" height="40" rx="12" className={cn("transition-all", isActive("hamstrings") ? "fill-sky-500" : "fill-sky-300")} />
            <rect x="122" y="303" width="26" height="40" rx="12" className={cn("transition-all", isActive("hamstrings") ? "fill-sky-500" : "fill-sky-300")} />
            <rect x="72" y="345" width="26" height="24" rx="10" className={cn("transition-all", isActive("calves") ? "fill-lime-500" : "fill-lime-300")} />
            <rect x="122" y="345" width="26" height="24" rx="10" className={cn("transition-all", isActive("calves") ? "fill-lime-500" : "fill-lime-300")} />
            <rect x="80" y="118" width="60" height="18" rx="8" className={cn("transition-all", isActive("back") ? "fill-blue-500/80" : "fill-blue-200/70")} />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Highlighted muscles</p>
          <div className="flex flex-wrap gap-2">
            {highlightedMuscles.length === 0 && (
              <span className="text-xs text-muted-foreground">Select an exercise to see targets.</span>
            )}
            {highlightedMuscles.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {MUSCLE_LABELS[muscle] ?? muscle}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
