import { Accordion } from '@dso-toolkit/sources';

import * as React from 'react';

import { DsoAccordion, DsoAccordionSection } from '../..';

export function accordionTemplate(
  {
    variant,
    reverseAlign,
    allowMultipleOpen,
    dsoToggleSection,
    sections
  }: Accordion
) {
  return (
    <DsoAccordion
      variant={variant}
      reverseAlign={reverseAlign}
      allowMultipleOpen={allowMultipleOpen}
      onDsoToggleSection={dsoToggleSection}
    >
      {sections.map((section, i) => (
        <DsoAccordionSection
          key={`dsoAccordionSection-${i}`}
          open={section.open}
          handleTitle={section.handleTitle}
          handleUrl={section.handleUrl}
          state={section.state}
          status={section.status}
          icon={section.icon}
          attachmentCount={section.attachmentCount}
        >
          <DemoHtml html={section.content} />
        </DsoAccordionSection>
      ))}
    </DsoAccordion>
  );
}

class DemoHtml extends React.PureComponent<{ html?: string; }> {
  divRef: React.RefObject<HTMLDivElement>;

  constructor(props: { html?: string; }) {
    super(props);

    this.divRef = React.createRef();
  }

  componentDidMount() {
    const parent = this.divRef.current?.parentElement;

    if (parent instanceof HTMLElement) {
      this.divRef.current?.childNodes.forEach(node => parent.appendChild(node));
    }
  }

  render() {
    if (!this.props.html) {
      return;
    }

    return <div style={{ display: 'none' }} ref={this.divRef} dangerouslySetInnerHTML={{ __html: this.props.html }}></div>;
  }
}
