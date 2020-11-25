module.exports = {
  meta: {
    webComponent: true,
    markup: true,
  },
  status: 'ready',
  collated: true,
  collator: (markup, item) => `<div class="col-xs-6${item.order % 2 === 1 ? ' text-right' : ''}"><p>${markup}</p></div>`,
  default: 'default',
  variants: [
    {
      name: 'default',
      context: {
        label: 'Label tekst'
      }
    },
    {
      name: 'info',
      context: {
        status: 'info',
        label: 'Label tekst'
      }
    },
    {
      name: 'primary',
      context: {
        status: 'primary',
        label: 'Label tekst'
      }
    },
    {
      name: 'success',
      context: {
        status: 'success',
        label: 'Label tekst'
      }
    },
    {
      name: 'warning',
      context: {
        status: 'warning',
        label: 'Label tekst'
      }
    },
    {
      name: 'danger',
      context: {
        status: 'danger',
        label: 'Label tekst'
      }
    }
  ].reduce((total, variant) => total.concat([
    variant,
    Object.assign({}, variant, {
      name: `${variant.name}-button`,
      context: Object.assign({}, variant.context, {
        button: 'times',
        buttonTitle: 'Verwijder'
      })
    })
  ]), [])
};
