export type StyleValueType = string | number;

export type StyleType = Record<string, StyleValueType>;

export interface PopmotionType {
  stop: () => void;
}
