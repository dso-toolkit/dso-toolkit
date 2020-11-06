/* eslint-env node */

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

module.exports = function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=/]/g, s => entityMap[s]);
};
