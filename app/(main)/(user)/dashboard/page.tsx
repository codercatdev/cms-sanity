import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  return (
    <div className="container px-5 mx-auto">
      <div className="w-full flex justify-center p-8 sm:p-20 md:p-32">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            User Dashboard Stuff...
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
