import { Accordion } from '@dso-toolkit/sources';
import { html } from 'lit-html';

export function accordionTemplate(
  {
    variant,
    handleElement,
    // sections,
    reverseAlign,
  }: Accordion
) {

  const coreVariant = typeof variant === 'string' ? variant.replace('dso-accordion-', '') : undefined;
  console.log('template', variant, coreVariant);

  return html`
    <dso-accordion
      variant=${coreVariant}
      handle-element=${handleElement}
      ?reverse-align=${reverseAlign}
    >
      <dso-accordion-section danger open>
        <span slot="section-handle">Item 1</span>

        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content</p>
        </div>

        <dso-accordion>
          <dso-accordion-section open>
            <span slot="section-handle">Item 1.1</span>
            <div class="dso-rich-content">
              <p><strong>hallo</strong> dit is content</p>
            </div>
          </dso-accordion-section>
          <dso-accordion-section>
            <span slot="section-handle">Item 1.2</span>
          </dso-accordion-section>
        </dso-accordion>

        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content na de nested section</p>
        </div>
      </dso-accordion-section>

      <dso-accordion-section info>
        <span slot="section-handle">Item 2</span>
        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content</p>
        </div>
      </dso-accordion-section>
      <dso-accordion-section>
        <span slot="section-handle">Item 3</span>
        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content</p>
        </div>
      </dso-accordion-section>
      <dso-accordion-section>
        <span slot="section-handle">Item 4</span>
        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content</p>
        </div>
      </dso-accordion-section>
      <dso-accordion-section danger info>
        <span slot="section-handle">Item 5</span>
        <div class="dso-rich-content">
          <p><strong>hallo</strong> dit is content</p>
        </div>
      </dso-accordion-section>
    </dso-accordion>
  `;
}
