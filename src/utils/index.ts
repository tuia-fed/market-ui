/**
 * 判断是否为数组
 */
export function isArray(array: unknown) {
  return Array.isArray(array);
}

/**
 * 随机生成[min, max]区间的整数
 * @param {Number} min-区间下限
 * @param {Number} max-区间上限
 */
export function randomRound(min: number, max: number): number {
  return min + Math.round(Math.random() * (max - min));
}

/**
 * 延时执行回调，返回Promise
 * @param {Number} time-延时的ms数
 */
export function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
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

/**
 * 加载远程图片
 * @param {String} url 图片cdn地址
 * @returns {Promise<HTMLImageElement>}
 */
export function downloadDomImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    function loadCallback() {
      img.removeEventListener('load', loadCallback);
      img.removeEventListener('error', errorCallback);
      resolve(img);
    }
    function errorCallback() {
      img.removeEventListener('load', loadCallback);
      img.removeEventListener('error', errorCallback);
      reject(new Error('图片下载失败'));
    }

    img.addEventListener('load', loadCallback);
    img.addEventListener('error', errorCallback);
    img.src = url;
  });
}
