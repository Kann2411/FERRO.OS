import { WelcomeSequence } from "@/features/ferro-core";
import { DesktopShell } from "@/modules/workspace";

export default function Home() {
  return (
    <>
      <WelcomeSequence />
      <DesktopShell />
    </>
  );
}
