function DsoToolkitResizeIframe(frame, element) {
  const measureElt = typeof element === 'string'
    ? frame.contentWindow.document.querySelector(element)
    : frame.contentWindow.document.body;
  const height = measureElt.scrollHeight;
  measureElt.style.marginTop = 0;

  frame.style.height = (height + 32) + 'px';
}
