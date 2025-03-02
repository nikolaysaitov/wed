import { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';

export const parseViewTemplate: HTMLReactParserOptions = {
  replace(domNode: DOMNode) {
    if (domNode instanceof Element && domNode.name) {
      if (domNode.name === 'html') {
        return <>{domToReact(domNode.childNodes as DOMNode[], parseViewTemplate)}</>;
      }

      if (domNode.name === 'head') {
        return <>{domToReact(domNode.childNodes as DOMNode[], parseViewTemplate)}</>;
      }

      if (domNode.name === 'meta' || domNode.name === 'title') {
        return <></>;
      }

      if (domNode.name === 'body') {
        return <div>{domToReact(domNode.childNodes as DOMNode[], parseViewTemplate)}</div>;
      }
    }
  }
};
