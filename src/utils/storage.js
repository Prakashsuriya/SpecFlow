// ============================================================
// LocalStorage CRUD for Specs — keeps max 5 (FIFO)
// ============================================================

const STORAGE_KEY = 'specflow_specs';

export function getRecentSpecs() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveSpec(spec) {
    const specs = getRecentSpecs();
    // Prepend new spec
    specs.unshift({
        ...spec,
        id: spec.id || crypto.randomUUID(),
        createdAt: spec.createdAt || new Date().toISOString(),
    });
    // Keep only last 5
    if (specs.length > 5) specs.length = 5;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
    return specs;
}

export function updateSpec(id, updatedSpec) {
    const specs = getRecentSpecs();
    const idx = specs.findIndex(s => s.id === id);
    if (idx !== -1) {
        specs[idx] = { ...specs[idx], ...updatedSpec };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
    }
    return specs;
}

export function deleteSpec(id) {
    let specs = getRecentSpecs();
    specs = specs.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
    return specs;
}

export function getSpecById(id) {
    const specs = getRecentSpecs();
    return specs.find(s => s.id === id) || null;
}
