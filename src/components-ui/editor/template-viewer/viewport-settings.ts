export const VIEWPORT_SETTINGS: Record<viewportType, IViewportSettings> = {
  mobile: {
    viewportWidth: 320,
    containerWidth: 320,
    height: 568
  },
  tablet: {
    viewportWidth: 768,
    containerWidth: 768,
    height: 1024
  },
  desktop: {
    viewportWidth: 2560, // Желаемая виртуальная ширина
    containerWidth: 789, // Реальная ширина контейнера
    height: 1024
  }
};

export type viewportType = 'mobile' | 'tablet' | 'desktop';
export interface IViewportSettings {
  viewportWidth: number;
  containerWidth: number;
  height: number;
}
