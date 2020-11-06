const nunjucks = require('nunjucks');
const utils = require('@frctl/fractal').utils;

module.exports = function (fractal) {
  return {
    container: container(fractal)
  }
};

function container(fractal) {
  function ContainerExtension() {
    this.tags = ['container'];
    
    this.parse = function (parser, nodes) {
      var tok = parser.nextToken();
      
      var args = parser.parseSignature(null, true);
      parser.advanceAfterBlockEnd(tok.value);
      
      // parse the body and possibly the error block, which is optional
      var body = parser.parseUntilBlocks('endcontainer');
      parser.advanceAfterBlockEnd();
      
      return new nodes.CallExtensionAsync(this, 'run', args, [body]);
    };
    
    this.run = function () {
      const source = fractal.components;
      const args = Array.from(arguments);
      const rootContext = args[0].ctx;
      const callback = args.pop();
      const body = args.pop();
      
      args.shift();
      const handle = args[0];
      let context = args[1];
      const merge = args[2] || false;
      const entity = source.find(handle);
      if (!entity) {
        throw new Error(`Could not render component '${handle}' - component not found.`);
      }
      const defaultContext = entity.isComponent ? entity.variants().default().context : entity.context;
      if (!context) {
        context = defaultContext;
      } else if (merge) {
        context = utils.defaultsDeep(context, defaultContext);
      }

      context.yield = body();

      source.resolve(context).then(context => {
        // fix env for rendered components
        let env = JSON.parse(JSON.stringify(rootContext._env));
        context._env = env;
        entity.render(context).then(html => {
          callback(null, new nunjucks.runtime.SafeString(html));
        }).catch(err => {
          callback(err);
        });
      });
    };
  };

  return new ContainerExtension();
}

