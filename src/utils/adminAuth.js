const ADMIN_SESSION_KEY = "fullstack-crew.admin-session";
export function isAdminAuthenticated() {
    if (typeof window === "undefined")
        return false;
    return window.localStorage.getItem(ADMIN_SESSION_KEY) === "active";
}
export function startAdminSession() {
    if (typeof window !== "undefined")
        window.localStorage.setItem(ADMIN_SESSION_KEY, "active");
}
export function endAdminSession() {
    if (typeof window !== "undefined")
        window.localStorage.removeItem(ADMIN_SESSION_KEY);
}
