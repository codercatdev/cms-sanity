"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LuClipboard, LuCheck } from "react-icons/lu";

export default function BlockCodeButton({ code }: { code: string }) {
  const startIcon = <LuClipboard className="h-4 w-4" />;
  const copiedIcon = <LuCheck className="h-4 w-4" />;
  const [icon, setIcon] = useState(startIcon);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setIcon(copiedIcon);
    setTimeout(() => {
      setIcon(startIcon);
    }, 1500);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="absolute top-0 right-0 mt-2 mr-2"
      onClick={copy}
    >
      {icon}
    </Button>
  );
}
