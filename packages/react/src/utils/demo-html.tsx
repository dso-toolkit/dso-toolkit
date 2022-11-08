import * as React from "react";

export class DemoHtml extends React.PureComponent<{ html?: string }> {
  divRef: React.RefObject<HTMLDivElement>;

  constructor(props: { html?: string }) {
    super(props);

    this.divRef = React.createRef();
  }

  componentDidMount() {
    const parent = this.divRef.current?.parentElement;

    if (parent instanceof HTMLElement) {
      this.divRef.current?.childNodes.forEach((node) => parent.appendChild(node));
    }
  }

  render() {
    if (!this.props.html) {
      return;
    }

    return (
      <div style={{ display: "none" }} ref={this.divRef} dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
    );
  }
}
