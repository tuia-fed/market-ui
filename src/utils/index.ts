export function isArray(array: unknown) {
  return Array.isArray(array);
}

export function randomRound(min: number, max: number): number {
  return min + Math.round(Math.random() * (max - min));
}

export function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
