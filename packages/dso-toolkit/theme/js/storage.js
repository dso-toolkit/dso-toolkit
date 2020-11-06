export function get(name, fallback) {
  const result = localStorage.getItem(name);
  return result ? JSON.parse(result) : fallback;
}

export function set(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}
