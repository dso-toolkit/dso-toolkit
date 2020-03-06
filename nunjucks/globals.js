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
  }
};
