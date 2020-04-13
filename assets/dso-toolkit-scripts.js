if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

function DsoToolkitResizeIframe(frame, element) {
  const measureElt = typeof element === 'string'
    ? frame.contentWindow.document.querySelector(element)
    : frame.contentWindow.document.body;
  const height = measureElt.scrollHeight;
  measureElt.style.marginTop = 0;

  frame.style.height = (height + 32) + 'px';
}

(function () {
  var cleanRegex = /[ -]/g;

  Vue.component('dso-navigation-filter', {
    template:
      '<div class="dso-search-bar">' +
        '<div class="dso-search-bar-input">' +
          '<span class="dso-search-icon" aria-hidden="true"></span>' +
          '<input type="text" placeholder="Filter op component" v-model.trim="input">' +
          '<button type="button" @click="clearFilter()" title="Zoekopdracht legen">' +
            'Zoekopdracht legen' +
          '</button>' +
        '</div>' +
      '</div>',
    data: function () {
      return {
        input: localStorage.getItem('filterValue') || '',
        items: Array.prototype.slice.call(document.querySelectorAll('[data-role="item"]')),
        collections: Array.prototype.slice.call(document.querySelectorAll('[data-behaviour="collection"]'))
      }
    },
    mounted: function () {
      this.filterMenu(this.input);
    },
    watch: {
      input: function (value) {
        localStorage.setItem('filterValue', value);

        this.filterMenu(value);
      }
    },
    methods: {
      clearFilter: function () {
        this.input = '';
      },
      filterMenu: function (value) {
        value = (value || '').toLowerCase().replace(cleanRegex, '')

        this.items.forEach(function (item) {
          var textElement = item.querySelector('a, button');
          if (!textElement) {
            return;
          }

          var text = textElement.text.trim().toLowerCase().replace(cleanRegex, '');
          var itemHidden = hidden(item);

          if (value === '') {
            if (itemHidden) {
              show(item);
            }
          }
          else {
            if (text.indexOf(value) === -1 && !itemHidden) {
              hide(item);
            }
            else if (text.indexOf(value) > -1 && itemHidden) {
              show(item);
            }

            if (!itemHidden) {
              var parents = getParents(item, '[data-behaviour="collection"], [data-behaviour="tree"]');

              parents.forEach(function (parent) {
                if (parent.matches('[data-behaviour="collection"].is-closed')) {
                  parent.classList.remove('is-closed');
                }
              });
            }
          }
        });

        this.collections.forEach(function (collection) {
          if (value === '') {
            if (hidden(collection)) {
              show(collection);
            }
          }
          else {
            var collectionHidden = hidden(collection);
            var items = Array.prototype.slice.call(collection.querySelectorAll('[data-role="item"]'));
            var allHidden = items.every(function (item) {
              return hidden(item);
            });

            if (allHidden && !collectionHidden) {
              hide(collection);
            }
            else if (!allHidden && collectionHidden) {
              collection.classList.remove('is-closed');
              show(collection);
            }
          }
        });
      }
    }
  });

  function hide(element) {
    element.style.display = 'none';
  }

  function show(element) {
    element.style.display = null;
  }

  function hidden(element) {
    return window.getComputedStyle(element).display === 'none';
  }

  function getParents(el, parentSelector) {
    var parents = [];
    var p = el.parentNode;

    while (p !== parent) {
      var o = p;

      parents.push(o);
      if (o.matches(parentSelector)) {
        break;
      }

      p = o.parentNode;
    }

    return parents;
  }

  new Vue({
    el: '#filter-app'
  });
})();
