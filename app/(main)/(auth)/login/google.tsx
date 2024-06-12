"use client";

//Firebase
import { ccdSignInWithPopUp } from "@/lib/firebase";
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

// Display
import { FirebaseError } from "firebase/app";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";

export default function GoogleAuth() {
  const { toast } = useToast();

  const login = async () => {
    try {
      await ccdSignInWithPopUp(provider);
      window.location.reload();
    } catch (err: any) {
      if (err instanceof FirebaseError) {
        if (err.code === "auth/account-exists-with-different-credential") {
          toast({
            variant: "destructive",
            description:
              "Account Exists with Different Login Method. Please first login and then link within your Account page.",
          });
        } else {
          toast({
            variant: "destructive",
            description: err.message,
          });
        }
      } else {
        toast({
          variant: "destructive",
          description: JSON.stringify(err),
        });
        console.error(err);
      }
    }
  };

  return (
    <Button onClick={login}>
      <FaGoogle className="mr-2 h-4 w-4" /> Login with Google
    </Button>
  );
}
