export interface ExplorerHistoryEntry {
  id: string;
  type: "module" | "achievement" | "progress" | "mission" | "event";
  label: string;
  detail: string;
  timestamp: string;
}

import { generateUUID } from "@/lib/uuid";

const historyEntries: ExplorerHistoryEntry[] = [];

export function addHistoryEntry(entry: ExplorerHistoryEntry) {
  // Ensure the entry has a unique id. Use the provided id when present and unique,
  // otherwise generate a UUID.
  let nextId = entry.id;
  if (!nextId || historyEntries.some((e) => e.id === nextId)) {
    do {
      nextId = generateUUID();
    } while (historyEntries.some((e) => e.id === nextId));
  }

  const entryWithId: ExplorerHistoryEntry = { ...entry, id: nextId };
  historyEntries.push(entryWithId);
  historyEntries.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  return historyEntries;
}

export function getHistoryEntries() {
  return [...historyEntries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export function clearHistoryEntries() {
  historyEntries.length = 0;
}
