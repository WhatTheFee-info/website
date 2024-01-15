export function getValueString(key: string): string | null {
  return localStorage.getItem(key);
}

export function saveValueString(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getValueDate(key: string): Date | null {
  const dateInt = localStorage.getItem(key);
  if (!dateInt) return null;
  return new Date(dateInt);
}

export function saveValueDate(key: string, value: Date) {
  localStorage.setItem(key, value.getTime().toString());
}

export function getValueObject<T>(key: string): T | null {
  const value = localStorage.getItem(key);
  if (!value) return null;
  return JSON.parse(value) as T;
}

export function saveValueObject<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}
