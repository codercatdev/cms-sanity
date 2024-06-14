"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { User } from "@/lib/firebase.types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useFirestoreUser } from "@/lib/firebase.hooks";

export default function Component() {
  const { user } = useFirestoreUser();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(data.entries());
    const uid = getAuth(app)?.currentUser?.uid;
    if (!uid) {
      setSaving(false);
      toast({
        variant: "destructive",
        description: "missing uid, try logging in again",
      });
      return;
    }
    const profile: NonNullable<User["settings"]>["profile"] = values;
    try {
      await setDoc(
        doc(getFirestore(), "users/" + uid),
        {
          settings: { profile },
        },
        { merge: true }
      );
      toast({
        description: "Saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: JSON.stringify(error),
      });
    }
    setSaving(false);
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  autoComplete="given-name"
                  defaultValue={
                    user?.settings?.profile?.name || user?.idt?.name
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={
                    user?.settings?.profile?.email || user?.idt?.email
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  name="bio"
                  rows={3}
                  defaultValue={
                    user?.settings?.profile?.bio || "Awesome developer!"
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-6 flex justify-between">
            <span className="text-yellow-500 flex-1">
              {saving ? "Saving..." : ""}
            </span>
            <Button type="submit" className="ml-4">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
