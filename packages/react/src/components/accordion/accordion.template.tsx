import { AccordionStorybookParameters } from '@dso-toolkit/sources';

import * as React from 'react';

import { DsoAccordion, DsoAccordionSection } from '../..';

export function accordionTemplate(
  {
    variant,
    reverseAlign,
    allowMultiple,
    dsoToggleSection,
    /* Section controls */
    open,
    status,
    state,
    attachmentCount,
    icon,
    heading,
    handleUrl,
    /* Content */
    content
  }: AccordionStorybookParameters
) {
  const firstSection = content[0];

  if (firstSection) {
    firstSection.open = open;
    firstSection.status = status;
    firstSection.state = state;
    firstSection.attachmentCount = attachmentCount;
    firstSection.icon = icon;
    firstSection.heading = heading;
    firstSection.handleUrl = handleUrl;
  }

  return (
    <DsoAccordion
      variant={variant}
      reverseAlign={reverseAlign}
      allowMultiple={allowMultiple}
      onDsoToggleSection={dsoToggleSection}
    >
      {content.map((section, i) => (
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
          <DemoHtml html={section.children} />
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
