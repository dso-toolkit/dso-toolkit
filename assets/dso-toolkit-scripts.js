function DsoToolkitResizeIframe(frame, element) {
  const measureElt = typeof element === 'string'
    ? frame.contentWindow.document.querySelector(element)
    : frame.contentWindow.document.body;
  const height = measureElt.scrollHeight;
  measureElt.style.marginTop = 0;

  frame.style.height = (height + 32) + 'px';
}

window.onload = toggleHeaderToggleTitle();

function toggleHeaderToggleTitle() {
  var obj = document.getElementsByClassName('Header-navToggle')[0];

  obj.addEventListener('click', function() {
    this.setAttribute('title', (document.getElementById('frame').classList.contains('is-closed'))?'toon navigatiemenu':'verberg navigatiemenu');
  });
}
