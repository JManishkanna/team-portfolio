/** Browser persistence used by the static admin console. Replace these helpers
 * with API calls when the Spring backend is connected. */
export function readContent<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = JSON.parse(window.localStorage.getItem(`fullstack-crew.${key}`) ?? "null");
    return value === null ? fallback : (value as T);
  } catch {
    return fallback;
  }
}

export function saveContent<T>(key: string, value: T): void {
  if (typeof window !== "undefined") window.localStorage.setItem(`fullstack-crew.${key}`, JSON.stringify(value));
}

export function hydrateArray<T>(key: string, target: T[]): T[] {
  const stored = readContent<T[] | null>(key, null);
  if (stored) target.splice(0, target.length, ...stored);
  return target;
}

export function hydrateObject<T extends object>(key: string, target: T): T {
  Object.assign(target, readContent<Partial<T>>(key, {}));
  return target;
}
