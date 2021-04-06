import Rotate from "./rotate";

export * from "./rotate";

export function useRotate(onUpdate) {
  return new Rotate(onUpdate);
}
