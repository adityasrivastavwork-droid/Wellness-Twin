import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLocation } from "wouter";
import { BodyMusclePreview } from "@/components/body-muscle-preview";

const gymExercises = [
  {
    name: "Squats",
    muscles: ["quads", "glutes", "core"],
    guidance: ["Brace your core before each rep.", "Drive through mid-foot to protect knees."],
  },
  {
    name: "Deadlift",
    muscles: ["hamstrings", "glutes", "back", "core"],
    guidance: ["Keep the bar close to your shins.", "Pause at the top to reset posture."],
  },
  {
    name: "Bench Press",
    muscles: ["chest", "triceps", "shoulders"],
    guidance: ["Retract shoulder blades for stability.", "Lower with control to keep tension."],
  },
  {
    name: "Overhead Press",
    muscles: ["shoulders", "triceps", "core"],
    guidance: ["Keep ribs down to avoid back strain.", "Press in a straight line over mid-foot."],
  },
  {
    name: "Pull-Ups",
    muscles: ["back", "biceps", "core"],
    guidance: ["Lead with the chest for full range.", "Use a controlled lower."],
  },
  {
    name: "Cycling",
    muscles: ["quads", "hamstrings", "calves"],
    guidance: ["Maintain steady cadence.", "Stay tall through the core."],
  },
];

export default function LogPage() {
  const { addLog } = useStore();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [mealName, setMealName] = useState("");
  const [hungerLevel, setHungerLevel] = useState([3]);
  const [notes, setNotes] = useState("");
  const [exerciseName, setExerciseName] = useState(gymExercises[0].name);
  const [exerciseIntensity, setExerciseIntensity] = useState([3]);
  const [exerciseDuration, setExerciseDuration] = useState("30");
  const [waterAmount, setWaterAmount] = useState("500");
  const [weightEntry, setWeightEntry] = useState("");
  const [cravingIntensity, setCravingIntensity] = useState([3]);
  const [cravingTrigger, setCravingTrigger] = useState("");
  const [sleepHours, setSleepHours] = useState("7");
  const [sleepQuality, setSleepQuality] = useState([3]);
  const [stressLevel, setStressLevel] = useState([3]);
  const [moodLevel, setMoodLevel] = useState([3]);

  const handleSubmit = (type: 'meal' | 'hunger') => {
    addLog({
      timestamp: new Date().toISOString(),
      type,
      value: type === 'meal' ? { name: mealName } : { level: hungerLevel[0] },
      notes
    });

    toast({
      title: "Logged successfully",
      description: "Your twin is analyzing the impact...",
    });

    setLocation("/");
  };

  const handleMetricSubmit = (type: 'water' | 'weight' | 'craving' | 'sleep' | 'stress' | 'mood') => {
    const payloadMap = {
      water: { amountMl: Number(waterAmount) },
      weight: { weight: weightEntry },
      craving: { intensity: cravingIntensity[0], trigger: cravingTrigger },
      sleep: { hours: Number(sleepHours), quality: sleepQuality[0] },
      stress: { level: stressLevel[0] },
      mood: { level: moodLevel[0] },
    } as const;

    addLog({
      timestamp: new Date().toISOString(),
      type,
      value: payloadMap[type],
      notes,
    });

    toast({
      title: "Logged successfully",
      description: "Your twin is updating your forecast windows.",
    });

    setLocation("/");
  };

  const handleGymSubmit = () => {
    const exercise = gymExercises.find((item) => item.name === exerciseName);
    addLog({
      timestamp: new Date().toISOString(),
      type: "movement",
      value: {
        exercise: exerciseName,
        duration: exerciseDuration,
        intensity: exerciseIntensity[0],
        muscles: exercise?.muscles ?? [],
      },
      notes,
    });

    toast({
      title: "Workout logged",
      description: "Your twin will update recovery and muscle insights.",
    });

    setLocation("/analysis");
  };

  const selectedExercise = gymExercises.find((item) => item.name === exerciseName);

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-display font-bold mb-6">Log Activity</h1>
        
        <Tabs defaultValue="meal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 mb-8">
            <TabsTrigger value="meal">Meal</TabsTrigger>
            <TabsTrigger value="hunger">Hunger</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="weight">Weight</TabsTrigger>
            <TabsTrigger value="craving">Cravings</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
            <TabsTrigger value="gym">Gym</TabsTrigger>
          </TabsList>

          <TabsContent value="meal" className="space-y-6 animate-in slide-in-from-bottom-5">
            <div className="space-y-2">
              <Label>What did you eat?</Label>
              <Input 
                placeholder="e.g. Oatmeal with berries" 
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-4">
              <Label>Hunger Before (1-5)</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-6">{hungerLevel}</span>
                <Slider 
                  value={hungerLevel} 
                  onValueChange={setHungerLevel} 
                  max={5} 
                  min={1} 
                  step={1} 
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <Textarea 
                placeholder="How did it make you feel?" 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button 
              className="w-full h-12 text-lg rounded-xl" 
              onClick={() => handleSubmit('meal')}
              disabled={!mealName}
            >
              Log Meal
            </Button>
          </TabsContent>
          
          <TabsContent value="hunger" className="space-y-6">
             <div className="p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-muted-foreground">Quick Hunger Check-in</p>
                <Slider 
                  value={hungerLevel} 
                  onValueChange={setHungerLevel} 
                  max={5} 
                  min={1} 
                  step={1} 
                  className="w-full max-w-xs"
                />
                <div className="flex justify-between w-full max-w-xs text-xs text-muted-foreground px-1">
                    <span>Starving</span>
                    <span>Neutral</span>
                    <span>Stuffed</span>
                </div>
                <Button onClick={() => handleSubmit('hunger')}>Save Hunger Level</Button>
             </div>
          </TabsContent>

          <TabsContent value="mood">
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Mood / Focus (1-5)</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-6">{moodLevel}</span>
                  <Slider
                    value={moodLevel}
                    onValueChange={setMoodLevel}
                    max={5}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                </div>
              </div>
              <Button
                className="w-full h-12 text-lg rounded-xl"
                onClick={() => handleMetricSubmit('mood')}
              >
                Log Mood
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="water" className="space-y-6">
            <div className="space-y-2">
              <Label>Water Intake (ml)</Label>
              <Input
                value={waterAmount}
                onChange={(e) => setWaterAmount(e.target.value)}
                placeholder="500"
                className="h-12 text-lg"
              />
            </div>
            <Button
              className="w-full h-12 text-lg rounded-xl"
              onClick={() => handleMetricSubmit('water')}
            >
              Log Water
            </Button>
          </TabsContent>

          <TabsContent value="weight" className="space-y-6">
            <div className="space-y-2">
              <Label>Weight (optional)</Label>
              <Input
                value={weightEntry}
                onChange={(e) => setWeightEntry(e.target.value)}
                placeholder="e.g. 70 kg"
                className="h-12 text-lg"
              />
            </div>
            <Button
              className="w-full h-12 text-lg rounded-xl"
              onClick={() => handleMetricSubmit('weight')}
            >
              Log Weight
            </Button>
          </TabsContent>

          <TabsContent value="craving" className="space-y-6">
            <div className="space-y-2">
              <Label>Trigger tag</Label>
              <Input
                value={cravingTrigger}
                onChange={(e) => setCravingTrigger(e.target.value)}
                placeholder="e.g. stress, boredom, social"
                className="h-12 text-lg"
              />
            </div>
            <div className="space-y-4">
              <Label>Craving Intensity (1-5)</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-6">{cravingIntensity}</span>
                <Slider
                  value={cravingIntensity}
                  onValueChange={setCravingIntensity}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <Button
              className="w-full h-12 text-lg rounded-xl"
              onClick={() => handleMetricSubmit('craving')}
            >
              Log Craving
            </Button>
          </TabsContent>

          <TabsContent value="sleep" className="space-y-6">
            <div className="space-y-2">
              <Label>Sleep hours</Label>
              <Input
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                placeholder="7"
                className="h-12 text-lg"
              />
            </div>
            <div className="space-y-4">
              <Label>Sleep Quality (1-5)</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-6">{sleepQuality}</span>
                <Slider
                  value={sleepQuality}
                  onValueChange={setSleepQuality}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <Button
              className="w-full h-12 text-lg rounded-xl"
              onClick={() => handleMetricSubmit('sleep')}
            >
              Log Sleep
            </Button>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            <div className="space-y-4">
              <Label>Stress Level (1-5)</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-6">{stressLevel}</span>
                <Slider
                  value={stressLevel}
                  onValueChange={setStressLevel}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <Button
              className="w-full h-12 text-lg rounded-xl"
              onClick={() => handleMetricSubmit('stress')}
            >
              Log Stress
            </Button>
          </TabsContent>

          <TabsContent value="gym" className="space-y-6">
            <div className="space-y-3">
              <Label>Select your workout</Label>
              <div className="grid gap-2">
                {gymExercises.map((exercise) => (
                  <Button
                    key={exercise.name}
                    type="button"
                    variant={exerciseName === exercise.name ? "default" : "outline"}
                    onClick={() => setExerciseName(exercise.name)}
                  >
                    {exercise.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Duration (minutes)</Label>
              <Input
                value={exerciseDuration}
                onChange={(e) => setExerciseDuration(e.target.value)}
                placeholder="30"
                className="h-12 text-lg"
              />
            </div>

            <div className="space-y-4">
              <Label>Intensity (1-5)</Label>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-6">{exerciseIntensity}</span>
                <Slider
                  value={exerciseIntensity}
                  onValueChange={setExerciseIntensity}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <BodyMusclePreview highlightedMuscles={selectedExercise?.muscles ?? []} />

            <div className="rounded-xl border bg-muted/20 p-4">
              <p className="text-sm font-semibold">Guidance</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground space-y-1">
                {selectedExercise?.guidance.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>

            <Button
              className="w-full h-12 text-lg rounded-xl"
              onClick={handleGymSubmit}
            >
              Log Workout
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
