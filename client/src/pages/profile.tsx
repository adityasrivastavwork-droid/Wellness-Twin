import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { settings, profile, updateSettings, updateProfile } = useStore();

  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-display font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your NutriTwin preferences and baseline signals.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Profile basics</CardTitle>
            <CardDescription>These settings personalize your twin’s guidance.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={settings.name}
                onChange={(e) => updateSettings({ name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Goal mode</Label>
              <Input
                value={settings.goal}
                onChange={(e) => updateSettings({ goal: e.target.value as typeof settings.goal })}
              />
            </div>
            <div className="space-y-2">
              <Label>Height</Label>
              <Input
                value={profile.height ?? ""}
                onChange={(e) => updateProfile({ height: e.target.value })}
                placeholder="e.g. 170 cm"
              />
            </div>
            <div className="space-y-2">
              <Label>Weight</Label>
              <Input
                value={profile.weight ?? ""}
                onChange={(e) => updateProfile({ weight: e.target.value })}
                placeholder="e.g. 70 kg"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lifestyle signals</CardTitle>
            <CardDescription>Baseline signals used for cravings and recovery predictions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Sleep baseline</Label>
              <Input
                value={profile.sleepBaseline ?? ""}
                onChange={(e) => updateProfile({ sleepBaseline: e.target.value as typeof profile.sleepBaseline })}
              />
            </div>
            <div className="space-y-2">
              <Label>Stress baseline</Label>
              <Input
                value={profile.stressBaseline ?? ""}
                onChange={(e) => updateProfile({ stressBaseline: e.target.value as typeof profile.stressBaseline })}
              />
            </div>
            <div className="space-y-2">
              <Label>Activity level</Label>
              <Input
                value={profile.activityLevel ?? ""}
                onChange={(e) => updateProfile({ activityLevel: e.target.value as typeof profile.activityLevel })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>Adjust optional logging and integration preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Connect steps/sleep (wearable)", key: "stepsSleep" },
              { label: "Enable barcode scan + food DB", key: "barcodeScan" },
              { label: "Enable photo meal logging", key: "photoLogging" },
              { label: "Enable voice logging", key: "voiceLogging" },
              { label: "Enable restaurant/menu imports", key: "restaurantImports" },
              { label: "Enable optional CGM data", key: "cgmImports" },
              { label: "Offline-first mode", key: "offlineFirst" },
            ].map((option) => (
              <div key={option.key} className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">{option.label}</span>
                <Switch
                  checked={profile.permissions[option.key as keyof typeof profile.permissions]}
                  onCheckedChange={(checked) =>
                    updateProfile({
                      permissions: { ...profile.permissions, [option.key]: checked },
                    })
                  }
                />
              </div>
            ))}
            <Button variant="outline">Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Missing-data handling</CardTitle>
            <CardDescription>Gentle re-entry when logs are missing.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between rounded-xl border p-3">
            <span className="text-sm font-medium">Estimate continuity from passive signals</span>
            <Switch defaultChecked />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
