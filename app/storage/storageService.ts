export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;

type StorageKeyType = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function getFromStorage<T>(key: StorageKeyType, defaultValue?: T) {
  const storageItem = localStorage.getItem(key);

  if (storageItem) {
    try {
      return JSON.parse(storageItem) as T;
    } catch (error) {
      throw new Error(`로컬 스토리지 아이템을 파싱할 수 없습니다. ${key}`);
    }
  }

  return defaultValue || null;
}

export function setToStorage<T>(key: StorageKeyType, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(
      `로컬 스토리지 해당 아이템을 저장할 수 없습니다 : ${key + " : " + value}`
    );
  }
}

export function removeFromStorage(key: StorageKeyType) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new Error(
      `로컬 스토리지에서 해당 키값을 가진 아이템을 삭제할 수 없습니다 : ${key}`
    );
  }
}
