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

export default function LogPage() {
  const { addLog } = useStore();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [mealName, setMealName] = useState("");
  const [hungerLevel, setHungerLevel] = useState([3]);
  const [notes, setNotes] = useState("");

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

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-display font-bold mb-6">Log Activity</h1>
        
        <Tabs defaultValue="meal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="meal">Meal</TabsTrigger>
            <TabsTrigger value="hunger">Hunger</TabsTrigger>
            <TabsTrigger value="mood">Mood</TabsTrigger>
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
            <div className="text-center py-10 text-muted-foreground">
                Mood logging coming soon in this prototype.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
