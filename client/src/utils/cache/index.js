export const createLocal = key => ({

    set: value => localStorage.setItem(key, value),
    get: () => localStorage.getItem(key),
    remove: () => localStorage.removeItem(key),
})