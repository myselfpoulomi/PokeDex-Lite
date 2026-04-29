const KEY = "pokedex_lite_favorites_by_email";

function readMap() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return {};
        const data = JSON.parse(raw);
        return data && typeof data === "object" && !Array.isArray(data)
            ? data
            : {};
    } catch {
        return {};
    }
}

function normalizeEmail(email) {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function getFavoriteIds(email) {
    const key = normalizeEmail(email);
    if (!key) return [];
    const ids = readMap()[key];
    if (!Array.isArray(ids)) return [];
    return ids
        .map((id) => Number(id))
        .filter((id) => Number.isFinite(id));
}


export function setFavoriteIds(email, ids) {
    const k = normalizeEmail(email);
    if (!k) return;
    const map = readMap();
    map[k] = ids;
    localStorage.setItem(KEY, JSON.stringify(map));
}
