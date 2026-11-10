/** Browser persistence used by the static admin console. Replace these helpers
 * with API calls when the Spring backend is connected. */
export function readContent(key, fallback) {
    if (typeof window === "undefined")
        return fallback;
    try {
        if (new URLSearchParams(window.location.search).get("adminPreview") === "1") {
            const preview = JSON.parse(window.sessionStorage.getItem("fullstack-crew.admin-preview") ?? "{}");
            if (Object.prototype.hasOwnProperty.call(preview, key))
                return preview[key];
        }
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
