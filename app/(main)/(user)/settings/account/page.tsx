import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function Component() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="********" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <div className="flex items-center space-x-2">
                <Switch id="two-factor" defaultChecked />
                <Label htmlFor="two-factor" className="text-sm font-medium">
                  Enable two-factor authentication
                </Label>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="delete-account">Delete Account</Label>
              <Button variant="destructive" id="delete-account">
                Delete Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
