import { FaLock, FaUnlock } from "react-icons/fa";
import { Badge } from "./ui/badge";

interface BadgePro {
  locked: boolean | null;
}

export default async function BadgePro(props: BadgePro) {
  const { locked } = props;
  return (
    <Badge className="flex gap-2" variant={locked ? "default" : "secondary"}>
      <p className="text-sm">{locked ? "Pro:" : "Public"}</p>
      {locked ? <FaLock /> : <FaUnlock />}
    </Badge>
  );
}
