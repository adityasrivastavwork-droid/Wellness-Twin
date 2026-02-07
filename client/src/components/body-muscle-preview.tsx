import { Suspense, useMemo } from "react";
import { BodyMap3D } from "@/components/body-map-3d";
import { lazy } from "react";

const LazyBodyModel3D = lazy(() => import("./body-model-3d").then((module) => ({ default: module.BodyModel3D })));

interface BodyMusclePreviewProps {
  highlightedMuscles: string[];
}

const useLowPowerMode = () => {
  return useMemo(() => {
    if (typeof window === "undefined") return true;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const lowCpu = (navigator.hardwareConcurrency ?? 4) <= 4;
    return prefersReducedMotion || lowCpu;
  }, []);
};

export function BodyMusclePreview({ highlightedMuscles }: BodyMusclePreviewProps) {
  const lowPower = useLowPowerMode();

  if (lowPower) {
    return <BodyMap3D highlightedMuscles={highlightedMuscles} />;
  }

  return (
    <Suspense fallback={<BodyMap3D highlightedMuscles={highlightedMuscles} />}>
      <LazyBodyModel3D highlightedMuscles={highlightedMuscles} />
    </Suspense>
  );
}
