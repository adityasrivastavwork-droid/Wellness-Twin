import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useStore, Goal, TrackingStyle } from "@/lib/store";
import { cn } from "@/lib/utils";

const goals: { label: string; value: Goal; description: string }[] = [
  { label: "⚖️ Fat loss (steady & realistic)", value: "Fast", description: "Focus on steady trend changes." },
  { label: "💪 Muscle / strength", value: "Performance", description: "Support training and recovery." },
  { label: "🍽 Blood sugar steadiness", value: "Consistency", description: "Smooth energy and cravings." },
  { label: "🧠 Focus & energy", value: "Performance", description: "Boost daytime clarity." },
  { label: "🧘 General wellness (Balanced)", value: "Balanced", description: "Default balanced guidance." },
];

const sleepOptions = ["<6h", "6–7h", "7–8h", "8h+"] as const;
const stressOptions = ["Low", "Medium", "High"] as const;
const activityOptions = ["Mostly sedentary", "Lightly active", "Active most days"] as const;
const dietaryOptions = [
  "No restrictions",
  "Vegetarian",
  "Vegan",
  "Halal",
  "Kosher",
  "Lactose sensitive",
  "Gluten sensitive",
  "Prefer low ultra-processed foods",
];
const cravingOptions = [
  "Late night",
  "Afternoon slump",
  "Stressful days",
  "Weekends",
  "After workouts",
  "Not sure yet",
];

export default function OnboardingPage() {
  const { settings, updateSettings, updateProfile, profile } = useStore();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>(settings.goal ?? "Balanced");
  const [height, setHeight] = useState(profile.height ?? "");
  const [weight, setWeight] = useState(profile.weight ?? "");
  const [sexAtBirth, setSexAtBirth] = useState(profile.sexAtBirth ?? "Prefer not to say");
  const [ageRange, setAgeRange] = useState(profile.ageRange ?? "18–29");
  const [sleepBaseline, setSleepBaseline] = useState(profile.sleepBaseline ?? "6–7h");
  const [stressBaseline, setStressBaseline] = useState(profile.stressBaseline ?? "Medium");
  const [activityLevel, setActivityLevel] = useState(profile.activityLevel ?? "Lightly active");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(
    profile.dietaryPreferences.length ? profile.dietaryPreferences : ["No restrictions"]
  );
  const [avoidFoods, setAvoidFoods] = useState(profile.avoidFoods ?? "");
  const [cravingWindows, setCravingWindows] = useState<string[]>(
    profile.cravingWindows.length ? profile.cravingWindows : ["Not sure yet"]
  );
  const [cravingIntensity, setCravingIntensity] = useState<number>(profile.cravingIntensity ?? 3);
  const [trackingStyle, setTrackingStyle] = useState<TrackingStyle>(profile.trackingStyle ?? "Guided");
  const [permissions, setPermissions] = useState(profile.permissions);

  const totalSteps = 9;
  const progress = useMemo(() => ((step + 1) / totalSteps) * 100, [step]);

  const toggleMulti = (value: string, list: string[], setList: (next: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleFinish = () => {
    updateSettings({ goal, onboardingCompleted: true });
    updateProfile({
      height,
      weight,
      sexAtBirth,
      ageRange,
      sleepBaseline,
      stressBaseline,
      activityLevel,
      dietaryPreferences,
      avoidFoods,
      cravingWindows,
      cravingIntensity: cravingIntensity as 1 | 2 | 3 | 4 | 5,
      trackingStyle,
      permissions,
    });
    setLocation("/");
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Build Your NutriTwin</h1>
            <p className="text-muted-foreground text-sm">
              Short, supportive onboarding. You can adjust these any time.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            Step {step + 1} of {totalSteps}
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>

        {step === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Meet NutriTwin — your living diet twin.</CardTitle>
              <CardDescription>
                We learn how your body responds to food, stress, and sleep — and help you reduce cravings before they happen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✅ No medical diagnosis</li>
                <li>✅ No perfect streaks</li>
                <li>✅ Your data stays yours (no global training)</li>
              </ul>
              <Button className="w-full" onClick={handleNext}>Build My Twin</Button>
            </CardContent>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>What would you like NutriTwin to support right now?</CardTitle>
              <CardDescription>Balanced is pre-selected and can be changed anytime.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {goals.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setGoal(option.value)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    goal === option.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </button>
              ))}
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Body basics</CardTitle>
              <CardDescription>These help us estimate trends — not judge progress.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Height (optional)</Label>
                  <Input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170 cm" />
                </div>
                <div className="space-y-2">
                  <Label>Weight (optional)</Label>
                  <Input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70 kg" />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Sex at birth (optional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Female", "Male", "Intersex", "Prefer not to say"].map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant={sexAtBirth === option ? "default" : "outline"}
                        onClick={() => setSexAtBirth(option as typeof sexAtBirth)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Age range</Label>
                  <div className="flex flex-wrap gap-2">
                    {["18–29", "30–39", "40–49", "50+"].map((option) => (
                      <Button
                        key={option}
                        type="button"
                        variant={ageRange === option ? "default" : "outline"}
                        onClick={() => setAgeRange(option as typeof ageRange)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">All optional. Skip to see wider confidence ranges.</p>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle rhythm</CardTitle>
              <CardDescription>Sleep + stress explain most late-day cravings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2 block">Typical sleep</Label>
                <div className="flex flex-wrap gap-2">
                  {sleepOptions.map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={sleepBaseline === option ? "default" : "outline"}
                      onClick={() => setSleepBaseline(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Usual stress level</Label>
                <div className="flex flex-wrap gap-2">
                  {stressOptions.map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={stressBaseline === option ? "default" : "outline"}
                      onClick={() => setStressBaseline(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Typical activity</Label>
                <div className="flex flex-wrap gap-2">
                  {activityOptions.map((option) => (
                    <Button
                      key={option}
                      type="button"
                      variant={activityLevel === option ? "default" : "outline"}
                      onClick={() => setActivityLevel(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Eating style & constraints</CardTitle>
              <CardDescription>Preferences, not rules. Helps us suggest better swaps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={dietaryPreferences.includes(option) ? "default" : "outline"}
                    onClick={() => toggleMulti(option, dietaryPreferences, setDietaryPreferences)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Foods you don’t want suggested (optional)</Label>
                <Input value={avoidFoods} onChange={(e) => setAvoidFoods(e.target.value)} placeholder="e.g. peanuts, fried foods" />
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Craving awareness</CardTitle>
              <CardDescription>When do cravings usually hit?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {cravingOptions.map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={cravingWindows.includes(option) ? "default" : "outline"}
                    onClick={() => toggleMulti(option, cravingWindows, setCravingWindows)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label>When they hit, how strong?</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{cravingIntensity}</span>
                  <Slider value={[cravingIntensity]} max={5} min={1} step={1} onValueChange={(val) => setCravingIntensity(val[0])} />
                </div>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Tracking style</CardTitle>
              <CardDescription>Choose how hands-on you want NutriTwin to be.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {([
                { label: "🟢 Light — I log when I can", value: "Light" },
                { label: "🟡 Guided — Gentle prompts & reflections (default)", value: "Guided" },
                { label: "🔵 Detailed — I like insights & patterns", value: "Detailed" },
              ] as const).map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTrackingStyle(option.value)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    trackingStyle === option.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-medium">{option.label}</div>
                </button>
              ))}
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 7 && (
          <Card>
            <CardHeader>
              <CardTitle>Permissions & integrations</CardTitle>
              <CardDescription>NutriTwin works even if you log nothing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Connect steps/sleep (wearable)", key: "stepsSleep" },
                { label: "Enable photo meal logging", key: "photoLogging" },
                { label: "Enable voice logging", key: "voiceLogging" },
                { label: "Offline-first mode (recommended)", key: "offlineFirst" },
              ].map((option) => (
                <div key={option.key} className="flex items-center justify-between rounded-xl border p-3">
                  <span className="text-sm font-medium">{option.label}</span>
                  <Switch
                    checked={permissions[option.key as keyof typeof permissions]}
                    onCheckedChange={(checked) =>
                      setPermissions((prev) => ({ ...prev, [option.key]: checked }))
                    }
                  />
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 8 && (
          <Card>
            <CardHeader>
              <CardTitle>First prediction</CardTitle>
              <CardDescription>We’ll refine quickly as you log data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-dashed p-4">
                <p className="text-sm font-semibold">Mini Hunger Map Preview</p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <div key={idx} className="h-6 rounded-md bg-primary/10" />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border p-4 bg-muted/30">
                <p className="text-sm font-semibold">24h Forecast</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Craving risk may be higher between 8–10pm tonight.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Confidence: Low (we’ll refine this fast)</p>
              </div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={handleBack}>Back</Button>
                <Button onClick={handleFinish}>Start My Day</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
