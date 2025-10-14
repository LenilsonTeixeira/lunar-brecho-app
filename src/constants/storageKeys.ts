/**
 * Constantes para chaves do localStorage
 * Centraliza todas as chaves para evitar duplicação e inconsistências
 */

export const STORAGE_KEYS = {
  // Autenticação
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_DATA: 'userData',

  // Feature Flags
  FEATURE_FLAGS: 'lunar-feature-flags',

  // Carrinho
  CART: 'cart',
} as const;

// Tipo para as chaves de storage
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
