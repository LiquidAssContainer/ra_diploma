export const storage = (key) => ({
  set: (value) => localStorage.setItem(key, JSON.stringify(value)),
  get: () => {
    const value = localStorage.getItem(key);
    return !value ? null : JSON.parse(value);
  },
  remove: () => localStorage.removeItem(key),
});
