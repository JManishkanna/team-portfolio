/** Browser persistence used by the static admin console. Replace these helpers
 * with API calls when the Spring backend is connected. */
export function readContent(key, fallback) {
    if (typeof window === "undefined")
        return fallback;
    try {
        const value = JSON.parse(window.localStorage.getItem(`fullstack-crew.${key}`) ?? "null");
        return value === null ? fallback : value;
    }
    catch {
        return fallback;
    }
}
export function saveContent(key, value) {
    if (typeof window !== "undefined")
        window.localStorage.setItem(`fullstack-crew.${key}`, JSON.stringify(value));
}
export function hydrateArray(key, target) {
    const stored = readContent(key, null);
    if (stored)
        target.splice(0, target.length, ...stored);
    return target;
}
export function hydrateObject(key, target) {
    Object.assign(target, readContent(key, {}));
    return target;
}
