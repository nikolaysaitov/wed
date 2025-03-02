import { createContext, useContext } from 'react';

export type sectionType =
  | 'main'
  | 'description'
  | 'advantages'
  | 'faq'
  | 'feedback'
  | 'instruction'
  | 'price'
  | 'profile'
  | 'like'
  | 'catalog'
  | 'login';

export const CurrentViewContext = createContext<{
  windowWidth: number;
  mediaView: mediaViewType;
  currentSection?: sectionType;
  setCurrentSection: (section: sectionType) => void;
}>({
  windowWidth: 1300,
  mediaView: 'desktop',
  currentSection: undefined,
  setCurrentSection: (_: sectionType) => {}
});
export const useCurrentView = () => useContext(CurrentViewContext);

export type mediaViewType = 'desktop' | 'tablet' | 'mobile';

interface BreakPoints {
  min: number;
  max: number;
}
export const MEDIA_BREAKPOINTS: Record<mediaViewType, BreakPoints> = {
  desktop: {
    min: 1300,
    max: 10000
  },
  tablet: {
    min: 768,
    max: 1299.9
  },
  mobile: {
    min: 0,
    max: 767.9
  }
};

export const checkMediaView = (width: number): mediaViewType => {
  switch (true) {
    case width < 768:
      return 'mobile';
    case width < 1300 && width >= 768:
      return 'tablet';
    default:
    case width >= 1300:
      return 'desktop';
  }
};
