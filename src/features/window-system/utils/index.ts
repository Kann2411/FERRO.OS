export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getViewportSafePosition(x: number, y: number, width: number, height: number) {
  const safeX = clamp(x, 24, Math.max(24, window.innerWidth - width - 24));
  const safeY = clamp(y, 24, Math.max(24, window.innerHeight - height - 24));

  return { x: safeX, y: safeY };
}
