import { DOMNode, domToReact, Element, Text, HTMLReactParserOptions } from 'html-react-parser';
import { TemplateSection } from '../sections/TemplateSection.tsx';
import { EditableField } from '../components/editableField/EditableField.tsx';
import { SwitchableContent } from '@pages/Editor/DraftPage/Template/components/switchableContent/SwitchableContent.tsx';
import { Palette } from '@pages/Editor/DraftPage/Template/components/palette/Palette.tsx';

// export const parseTemplate = () => {};
export const parseTemplateOptions: HTMLReactParserOptions = {
  replace(domNode: DOMNode) {
    if (domNode instanceof Element && domNode.name) {
      // console.log(domNode);

      if (domNode.name === 'html') {
        console.log('@@@', domNode, domNode.name);
        return <>{domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}</>;
      }

      if (domNode.name === 'head') {
        return <>{domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}</>;
      }

      if (domNode.name === 'meta' || domNode.name === 'title') {
        return <></>;
      }

      if (domNode.name === 'body') {
        return <div>{domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}</div>;
      }

      if (domNode.attribs.id === 'header') {
        return (
          <TemplateSection id={'header'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'header-husband') {
        console.log(domNode, domNode.attribs.class, (domNode.childNodes[0] as Text).data);

        return (
          <EditableField
            id={'header-wife'}
            className={domNode.attribs.class}
            initialValue={(domNode.childNodes[0] as Text).data}
            onChange={(c) => {
              console.log(c);
            }}
          />
        );
      }

      if (domNode.attribs.id === 'header-wife') {
        return (
          <EditableField
            id={'header-wife'}
            className={domNode.attribs.class}
            initialValue={(domNode.childNodes[0] as Text).data}
            onChange={() => {
              // console.log(c);
            }}
          />
        );
      }

      if (domNode.attribs.id === 'info') {
        return (
          <TemplateSection id={'info'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }
      //
      if (domNode.attribs.id === 'location') {
        return (
          <TemplateSection id={'location'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'location-weddingPlace') {
        return (
          <SwitchableContent id={'weddingPlace'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </SwitchableContent>
        );
      }

      if (domNode.attribs.id === 'location-banquet') {
        return (
          <SwitchableContent id={'banquet'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </SwitchableContent>
        );
      }

      if (domNode.attribs.id === 'timeline') {
        return (
          <TemplateSection id={'timeline'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'timer') {
        return (
          <TemplateSection id={'timer'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'dresscode') {
        return (
          <TemplateSection id={'dresscode'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'dresscode-palette') {
        return <Palette className={domNode.attribs.class} />;
      }

      if (domNode.attribs.id === 'details') {
        return (
          <TemplateSection id={'details'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'rsvp') {
        return (
          <TemplateSection id={'rsvp'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }

      if (domNode.attribs.id === 'questions') {
        return (
          <TemplateSection id={'questions'} className={domNode.attribs.class}>
            {domToReact(domNode.childNodes as DOMNode[], parseTemplateOptions)}
          </TemplateSection>
        );
      }
    }
  }
};
