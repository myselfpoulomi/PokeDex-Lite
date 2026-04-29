import { jwtDecode } from "jwt-decode";

const KEY = "pokedex_lite_user";

export function getSession() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || typeof data.email !== "string") return null;
        return {
            name: typeof data.name === "string" ? data.name : "",
            email: data.email,
            picture: typeof data.picture === "string" ? data.picture : "",
        };
    } catch {
        return null;
    }
}

export const POKEDEX_SESSION_EVENT = "pokedex-lite-session";

export function setSession(user) {
    localStorage.setItem(
        KEY,
        JSON.stringify({
            name: user.name ?? "",
            email: user.email ?? "",
            picture: user.picture ?? "",
        })
    );
    window.dispatchEvent(new Event(POKEDEX_SESSION_EVENT));
}

export function clearSession() {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(POKEDEX_SESSION_EVENT));
}

/** Decode Google ID token credential (JWT) payload — frontend-only, not verified. */
export function parseGoogleCredential(credential) {
    const payload = jwtDecode(credential);
    return {
        name: typeof payload.name === "string" ? payload.name : "",
        email: typeof payload.email === "string" ? payload.email : "",
        picture: typeof payload.picture === "string" ? payload.picture : "",
    };
}
