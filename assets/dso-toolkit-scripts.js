function DsoToolkitResizeIframe(frame, element) {
  const height = typeof element === 'string'
    ? frame.contentWindow.document.querySelector(element).scrollHeight
    : frame.contentWindow.document.body.scrollHeight;

  frame.style.height = `${height * 1.2}px`;
}
