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

const MUSCLE_COLORS: Record<string, string> = {
  chest: "#6366f1",
  shoulders: "#8b5cf6",
  biceps: "#22c55e",
  triceps: "#14b8a6",
  core: "#f59e0b",
  back: "#3b82f6",
  glutes: "#f43f5e",
  quads: "#a855f7",
  hamstrings: "#0ea5e9",
  calves: "#84cc16",
};

interface BodyModel3DProps {
  highlightedMuscles: string[];
}

export function BodyModel3D({ highlightedMuscles }: BodyModel3DProps) {
  const isActive = (muscle: string) => highlightedMuscles.includes(muscle);

  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">3D Muscle Preview</p>
          <p className="text-xs text-muted-foreground">
            Mesh-inspired layers pulse to simulate activation and recovery.
          </p>
        </div>
        <div className="text-[10px] text-muted-foreground">Preview</div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] items-center">
        <div className="relative mx-auto w-full max-w-xs">
          <style>
            {`
              @keyframes musclePulse {
                0% { transform: scale(1); opacity: 0.55; }
                50% { transform: scale(1.05); opacity: 0.9; }
                100% { transform: scale(1); opacity: 0.55; }
              }
              .muscle-active {
                animation: musclePulse 2.5s ease-in-out infinite;
                filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.6));
              }
            `}
          </style>
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

            <rect
              x="72"
              y="110"
              width="76"
              height="30"
              rx="14"
              fill={MUSCLE_COLORS.chest}
              className={cn("transition-all", isActive("chest") ? "muscle-active" : "opacity-40")}
            />
            <rect
              x="62"
              y="100"
              width="22"
              height="22"
              rx="10"
              fill={MUSCLE_COLORS.shoulders}
              className={cn("transition-all", isActive("shoulders") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="136"
              y="100"
              width="22"
              height="22"
              rx="10"
              fill={MUSCLE_COLORS.shoulders}
              className={cn("transition-all", isActive("shoulders") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="45"
              y="135"
              width="18"
              height="30"
              rx="8"
              fill={MUSCLE_COLORS.biceps}
              className={cn("transition-all", isActive("biceps") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="157"
              y="135"
              width="18"
              height="30"
              rx="8"
              fill={MUSCLE_COLORS.biceps}
              className={cn("transition-all", isActive("biceps") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="45"
              y="170"
              width="18"
              height="30"
              rx="8"
              fill={MUSCLE_COLORS.triceps}
              className={cn("transition-all", isActive("triceps") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="157"
              y="170"
              width="18"
              height="30"
              rx="8"
              fill={MUSCLE_COLORS.triceps}
              className={cn("transition-all", isActive("triceps") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="80"
              y="145"
              width="60"
              height="40"
              rx="18"
              fill={MUSCLE_COLORS.core}
              className={cn("transition-all", isActive("core") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="80"
              y="185"
              width="60"
              height="22"
              rx="10"
              fill={MUSCLE_COLORS.core}
              className={cn("transition-all", isActive("core") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="78"
              y="210"
              width="64"
              height="24"
              rx="12"
              fill={MUSCLE_COLORS.glutes}
              className={cn("transition-all", isActive("glutes") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="72"
              y="235"
              width="26"
              height="68"
              rx="12"
              fill={MUSCLE_COLORS.quads}
              className={cn("transition-all", isActive("quads") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="122"
              y="235"
              width="26"
              height="68"
              rx="12"
              fill={MUSCLE_COLORS.quads}
              className={cn("transition-all", isActive("quads") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="72"
              y="303"
              width="26"
              height="40"
              rx="12"
              fill={MUSCLE_COLORS.hamstrings}
              className={cn("transition-all", isActive("hamstrings") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="122"
              y="303"
              width="26"
              height="40"
              rx="12"
              fill={MUSCLE_COLORS.hamstrings}
              className={cn("transition-all", isActive("hamstrings") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="72"
              y="345"
              width="26"
              height="24"
              rx="10"
              fill={MUSCLE_COLORS.calves}
              className={cn("transition-all", isActive("calves") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="122"
              y="345"
              width="26"
              height="24"
              rx="10"
              fill={MUSCLE_COLORS.calves}
              className={cn("transition-all", isActive("calves") ? "muscle-active" : "opacity-35")}
            />
            <rect
              x="80"
              y="118"
              width="60"
              height="18"
              rx="8"
              fill={MUSCLE_COLORS.back}
              className={cn("transition-all", isActive("back") ? "muscle-active" : "opacity-35")}
            />
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
          <p className="text-[10px] text-muted-foreground">
            Low-power devices fall back to a static map automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
