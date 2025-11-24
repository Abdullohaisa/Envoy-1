import { useAtom } from "jotai";
import { errorAtom } from "./errorAtom";
import SheetModal from "@/components/Modal/SheetModal";

export default function AppErrorModal() {
  const [error, setError] = useAtom(errorAtom);

  const handleDismiss = () => setError(null);

  return (
    <SheetModal
      open={!!error}
      onDismiss={handleDismiss}
      type="ok"
      message={error || ""}
      onOk={handleDismiss}
    />
  );
}
