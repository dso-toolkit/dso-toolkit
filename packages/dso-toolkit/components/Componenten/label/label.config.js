module.exports = {
  meta: {
    webComponent: true,
    markup: true,
  },
  status: 'ready',
  collated: true,
  collator: (markup, item) => `<div class="col-xs-6${item.order % 2 === 1 ? ' text-right' : ''}"><p>\n${markup}\n</p></div>`,
  default: 'default',
  variants: [
    {
      name: 'default',
      context: {
        status: 'Label',
        label: 'Label tekst'
      }
    },
    {
      name: 'info',
      context: {
        status: 'Info',
        modifier: 'info',
        label: 'Label tekst'
      }
    },
    {
      name: 'primary',
      context: {
        status: 'Primair',
        modifier: 'primary',
        label: 'Label tekst'
      }
    },
    {
      name: 'success',
      context: {
        status: 'Succes',
        modifier: 'success',
        label: 'Label tekst'
      }
    },
    {
      name: 'warning',
      context: {
        status: 'Waarschuwing',
        modifier: 'warning',
        label: 'Label tekst'
      }
    },
    {
      name: 'danger',
      context: {
        status: 'Gevaar',
        modifier: 'danger',
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
