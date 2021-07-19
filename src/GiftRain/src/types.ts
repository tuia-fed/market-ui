export interface GiftProps {
  /** x轴位置 */
  x: number;
  /** y轴位置 */
  y: number;
  /** 宽 */
  width: number;
  /** 高 */
  height: number;
  /** 红包图片资源 */
  source: HTMLImageElement;
  /** 移动速度 */
  speed: number;
}

export interface CanvasProps {
  /** canvas上下文 */
  context: CanvasRenderingContext2D;
  /** 画布宽 */
  width: number;
  /** 画布高 */
  height: number;
}

export interface ImageProps {
  /** image实例 */
  image: HTMLImageElement;
  /** 图片的原始宽 */
  imageWidth: number;
  /** 图片的原始高 */
  imageHeight: number;
}

export type ImageState = {
  /** x轴位置 */
  x: number;
  /** y轴位置 */
  y: number;
  /** 移动速度 */
  speed: number;
};
