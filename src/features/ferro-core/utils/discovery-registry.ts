export interface DiscoveryRecord {
  id: string;
  label: string;
  source: string;
  timestamp: string;
}

const discoveryRegistry = new Map<string, DiscoveryRecord>();

export function registerDiscoveryRecord(id: string, label: string, source: string) {
  if (discoveryRegistry.has(id)) {
    return false;
  }

  discoveryRegistry.set(id, {
    id,
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
