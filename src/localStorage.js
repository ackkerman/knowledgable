function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }
  setItem(key, value) {
    this.store.set(key, String(value));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

const memoryStorage = new MemoryStorage();

export function getStorage() {
  if (isBrowser()) {
    return window.localStorage;
  }
  return memoryStorage;
}

export function getItem(key) {
  return getStorage().getItem(key);
}

export function setItem(key, value) {
  getStorage().setItem(key, String(value));
}

export function removeItem(key) {
  getStorage().removeItem(key);
}

export function clear() {
  getStorage().clear();
}
