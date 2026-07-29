export interface DiscoveryRecord {
  id: string;
  label: string;
  source: string;
  timestamp: string;
}

import { generateUUID } from "@/lib/uuid";

const discoveryRegistry = new Map<string, DiscoveryRecord>();

export function registerDiscoveryRecord(id: string | undefined, label: string, source: string) {
  const recordId = id ?? generateUUID();
  if (discoveryRegistry.has(recordId)) {
    return false;
  }

  discoveryRegistry.set(recordId, {
    id: recordId,
    label,
    source,
    timestamp: new Date().toISOString(),
  });

  return true;
}

export function getDiscoveryRecords() {
  return Array.from(discoveryRegistry.values()).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

export function clearDiscoveryRegistry() {
  discoveryRegistry.clear();
}
