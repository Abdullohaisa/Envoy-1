import { useAtom } from "jotai";
import { errorAtom } from "./errorAtom";
import AppModal from "Components/AppModal/AppModal";

export default function AppErrorModal() {
  const [error, setError] = useAtom(errorAtom);

  const handleDismiss = () => setError(null);

  return (
    <AppModal
      open={!!error}
      onDismiss={handleDismiss}
      type="ok"
      message={error || ""}
      onOk={handleDismiss}
    />
  );
}
