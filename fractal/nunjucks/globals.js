module.exports = {
  className: function () {
    const classes = [...arguments].reduce((classes, c) => {
      if (typeof c === 'string' && c !== '') {
        classes.push(c)
      }

      if (Array.isArray(c) && c.length === 2) {
        const [condition, className] = c;

        if (!!condition) {
          classes.push(className);
        }
      }

      return classes;
    }, []);

    return classes.length === 0
      ? ''
      : this.env.filters.safe(`class="${classes.join(' ')}"`);
  },
  attributes: function attributes () {
    const attrs = [...arguments].reduce((total, [condition, attribute, value]) => {
      if (condition) {
        if (!value) {
          total.push(attribute);
        }
        else {
          total.push(`${attribute}="${value}"`);
        }
      }

      return total;
    }, []);

    return attrs.length === 0
      ? ''
      : this.env.filters.safe(attrs.join(' '));
  },
  merge: function merge(...objects) {
    return Object.assign({}, ...objects);
  },
  generateLocalId: function localId(prefix, id) {
    return prefix
      ? `${prefix}-${id}`
      : id;
  }
};
