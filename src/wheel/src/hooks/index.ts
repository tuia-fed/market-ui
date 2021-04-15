import Rotate, { OnUpdate } from "./rotate";

export * from "./rotate";

export function useRotate(onUpdate: OnUpdate) {
  return new Rotate(onUpdate);
}
