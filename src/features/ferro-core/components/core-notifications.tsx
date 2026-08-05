"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "@/features/audio-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

const notificationStyles: Record<string, string> = {
  success: "border-emerald-400/30 bg-emerald-500/10 text-secondary",
  info: "border-white/10 bg-white/5 text-secondary",
  achievement: "border-primary/30 bg-primary/10 text-secondary",
  mission: "border-primary/30 bg-primary/10 text-secondary",
  warning: "border-amber-400/30 bg-amber-400/10 text-secondary",
};

export function CoreNotifications() {
  const { notifications, dismissNotification } = useFerroCore();
  const { playSound } = useAudio();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-20 z-70 flex w-[320px] flex-col gap-3" role="region" aria-label="Notifications">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`rounded-2xl border px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl ${notificationStyles[notification.type]}`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{notification.title}</p>
                <p className="mt-1 text-sm leading-6 text-secondary">{notification.body}</p>
              </div>
              <button
                type="button"
                aria-label={`Dismiss notification: ${notification.title}`}
                onClick={() => {
                  playSound("notifications", "dismiss");
                  dismissNotification(notification.id);
                }}
                className="text-sm text-secondary transition hover:text-white"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
