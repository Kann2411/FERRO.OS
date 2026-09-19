"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useAudio } from "@/features/audio-engine";
import { useUi } from "@/hooks/use-lang";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CONTACT_EMAIL = "hola@ferro.os";

const textareaClassName =
  "min-h-28 w-full flex-1 resize-none rounded-xl border border-border bg-surface-2 px-3 py-2 text-sm text-foreground placeholder:text-muted transition focus-visible:border-primary focus-visible:shadow-[0_0_0_1px_var(--primary)] focus-visible:outline-none";

export function SignalModule() {
  const { completeMission } = useFerroCore();
  const { playSound } = useAudio();
  const tUi = useUi();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission) — the address stays visible on the button.
    }

    playSound("ui", "click");
    setCopied(true);
    completeMission("leave-signal");
  };

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    playSound("ui", "click");
    completeMission("leave-signal");
    setSent(true);

    const subject = encodeURIComponent(`FERRO.OS · ${name}`);
    const text = encodeURIComponent(`${body}\n\n— ${name} · ${from}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${text}`;
  };

  const handleReset = () => {
    setName("");
    setFrom("");
    setBody("");
    setSent(false);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("signalQueuedKicker")}</p>
        <h2 className="text-xl font-semibold text-white">{tUi("signalQueuedTitle")}</h2>
        <p className="max-w-xs text-sm leading-6 text-secondary">
          {tUi("signalQueuedBody")} <span className="text-white">{CONTACT_EMAIL}</span>
        </p>
        <Button variant="outline" onClick={handleReset} className="mt-2">
          {tUi("signalWriteAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSend} className="flex h-full flex-col gap-3 overflow-auto">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("signalChannelKicker")}</p>
        <h2 className="mt-1 text-xl font-semibold text-white">{tUi("signalTitle")}</h2>
        <p className="mt-2 text-sm text-secondary">{tUi("signalAvailability")}</p>
      </div>

      <Input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder={tUi("signalNamePlaceholder")}
        aria-label={tUi("signalNamePlaceholder")}
        autoComplete="name"
        required
      />
      <Input
        type="email"
        value={from}
        onChange={(event) => setFrom(event.target.value)}
        placeholder={tUi("signalEmailPlaceholder")}
        aria-label={tUi("signalEmailPlaceholder")}
        autoComplete="email"
        required
      />
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder={tUi("signalMessagePlaceholder")}
        aria-label={tUi("signalMessagePlaceholder")}
        className={textareaClassName}
        required
      />

      <div className="flex flex-wrap gap-2">
        <Button type="submit">{tUi("signalSend")}</Button>
        <Button
          variant="outline"
          onClick={handleCopy}
          aria-label={tUi("signalCopyEmailAria")}
          aria-live="polite"
        >
          {copied ? tUi("signalCopied") : CONTACT_EMAIL}
        </Button>
      </div>
    </form>
  );
}
