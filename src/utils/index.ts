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

export interface DomProps {
  /** 当前元素的id */
  id: string;
  /** 当前元素的实例 */
  dom: HTMLElement;
}

/**
 * 获取当前元素的父容器的rect信息
 * @param {String} id
 * @param {HTMLElement} dom
 */
export function getParentRect(current: Partial<DomProps>): Promise<ClientRect> {
  const currentDom = current.id
    ? document.getElementById(current.id)
    : current.dom;
  const parent = currentDom?.parentElement;
  const parentRect = parent?.getBoundingClientRect();
  return new Promise((resolve, reject) => {
    if (parentRect) {
      resolve(parentRect as ClientRect);
    } else {
      reject();
    }
  });
}
