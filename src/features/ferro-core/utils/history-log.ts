export interface ExplorerHistoryEntry {
  id: string;
  type: "module" | "achievement" | "progress" | "mission" | "event";
  label: string;
  detail: string;
  timestamp: string;
}

const historyEntries: ExplorerHistoryEntry[] = [];

export function addHistoryEntry(entry: ExplorerHistoryEntry) {
  historyEntries.push(entry);
  historyEntries.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  return historyEntries;
}

export function getHistoryEntries() {
  return [...historyEntries].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export function clearHistoryEntries() {
  historyEntries.length = 0;
}
