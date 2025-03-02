import { ReactNode, UIEvent, useEffect, useRef } from "react";
import { useInView, UseInViewOptions } from "framer-motion";
import {
  sectionType,
  useCurrentView,
} from "../../context/current-view/CurrentViewContext.ts";

type CheckCurrentSectionProps = {
  className?: string;
  id?: string;
  options?: UseInViewOptions;
  sectionName: sectionType;
  children: ReactNode | ReactNode[] | null;
  onScroll?: (event: UIEvent<HTMLElement>) => void;
};

export const CheckCurrentSection = ({
  className,
  sectionName,
  children,
  options,
  onScroll,
  ...props
}: CheckCurrentSectionProps) => {
  const refs = useRef<HTMLDivElement>(null);
  const isInView = useInView(refs, options);
  const { setCurrentSection } = useCurrentView();

  useEffect(() => {
    if (isInView) {
      setCurrentSection(sectionName);
      // location.replace('#' + sectionName);
    }
  }, [isInView]);

  return (
    <section className={className} {...props} ref={refs} onScroll={onScroll}>
      {children}
    </section>
  );
};
