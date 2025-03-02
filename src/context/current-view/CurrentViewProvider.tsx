import { ReactNode, useEffect, useState } from "react";
import {
  checkMediaView,
  CurrentViewContext,
  mediaViewType,
  sectionType,
} from "./CurrentViewContext.ts";
import { useLocation } from "react-router-dom";

interface CurrentViewProviderProps {
  children: ReactNode;
}
export const CurrentViewProvider = ({ children }: CurrentViewProviderProps) => {
  const [currentSection, setCurrentSection] = useState<sectionType | undefined>(
    undefined,
  );
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [mediaView, setMediaView] = useState<mediaViewType>(
    checkMediaView(window.innerWidth),
  );
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    let timer = 0;

    if (hash === "") {
      window.scrollTo(0, 0);
    } else {
      timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [pathname, hash, key]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setMediaView(checkMediaView(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <CurrentViewContext.Provider
      value={{ currentSection, setCurrentSection, windowWidth, mediaView }}
    >
      {children}
    </CurrentViewContext.Provider>
  );
};
