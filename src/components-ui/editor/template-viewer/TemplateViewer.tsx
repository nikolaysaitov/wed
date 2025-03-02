import { ReactNode, useEffect, useRef, useState } from 'react';

import styles from './TemplateViewer.module.scss';
import { VIEWPORT_SETTINGS } from './viewport-settings.ts';

type Props = {
  html?: string;
  htmlElement?: ReactNode | ReactNode[];
  htmlUrl?: string;
};

export const TemplateViewer = ({ html, htmlElement, htmlUrl }: Props) => {
  const [device] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const divRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scale, setScale] = useState<number>(0);
  const [iframe, setIframe] = useState<ReactNode | null>(null);

  const updateWidth = () => {
    if (divRef.current) {
      setContainerWidth(divRef.current.getBoundingClientRect().width);
    }
  };

  useEffect(() => {
    requestAnimationFrame(updateWidth);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const setting = VIEWPORT_SETTINGS[device];

    setScale(containerWidth / setting.viewportWidth);
  }, [containerWidth]);

  useEffect(() => {
    if (htmlElement) {
      console.log(htmlElement);
      setIframe(htmlElement);
    } else if (htmlUrl) {
      setIframe(
        <iframe
          src={htmlUrl}
          className={styles.iframe}
          title="Template Preview"
          sandbox="allow-same-origin allow-scripts"
        />
      );
    }
  }, [html, htmlUrl, htmlElement]);

  return (
    <div ref={divRef} style={{ width: '100%' }}>
      <div
        ref={divRef}
        className={styles.root}
        style={{
          width: `${
            containerWidth ?? VIEWPORT_SETTINGS[device].containerWidth
          }px`,
          height: `${VIEWPORT_SETTINGS[device].height}px`,
          minHeight: htmlElement ? 'fit-content' : 'unset'
        }}
      >
        <div
          style={{
            width: `${VIEWPORT_SETTINGS[device].viewportWidth}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            height:
              device === 'desktop'
                ? `calc(${100 * 10 * scale}vh - ${10 * scale * 100}px)`
                : 'auto'
          }}
        >
          {iframe}
        </div>
      </div>{' '}
    </div>
  );
};
