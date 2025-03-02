import template1 from '../../../../public/assets/images/phone.png';
import gifTemplate1 from '../../../../public/assets/gif/template1.gif';

export interface Template {
    src: string;
    alt?: string;
    gifSrc: string;
  }

export const TEMPLATES: Template[] = [
    {
      src: template1,
      alt: 'template1',
      gifSrc: gifTemplate1
    },
    {
      src: template1,
      alt: 'template2',
      gifSrc: gifTemplate1
    },
    {
      src: template1,
      alt: 'template3',
      gifSrc: gifTemplate1
    }
  ];