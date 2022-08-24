import { iconTemplate } from '@dso-toolkit/core/src/components/icon/icon.template';
import { html } from 'lit-html';

export const richContent = html`
  <div class="dso-rich-content">
    <h2>Heading 2</h2>

    <p>
      Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nullam non metus dolor. Pellentesque velit arcu, pellentesque at lacus sit amet, porta semper est. Praesent mollis lorem lorem, non varius nisl lacinia et. Integer quis sollicitudin arcu. <a href="#">Nullam</a> lacinia non ipsum sit amet varius. Praesent consequat ligula id tortor elementum pretium. Integer ligula justo, volutpat sed tellus eu, faucibus fringilla lectus.
    </p>

    <a href="#" class="btn btn-primary">Primaire button</a>
    <a href="#" class="btn btn-default">Secundaire button</a>
    <a href="#" class="btn btn-link btn-align">
      Tertiaire button
      ${iconTemplate({ icon: 'chevron-down' })}
    </a>
  </div>
`;
