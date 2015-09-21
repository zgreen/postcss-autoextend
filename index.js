var postcss       = require('postcss');
var postCSSExtend = require('postcss-extend');
var alphaSort     = require('alpha-sort');
var uniqueId      = require('uniqueid');

module.exports = postcss.plugin('postcss-autoextender', function (opts) {

  opts = opts || {};
  return function (css, result) {
    css.walkAtRules(function(atRule) {
      var placeholders = [];
      if (atRule.name === 'autoextend') {
        var decls = [];
        atRule.nodes.forEach(function(declaration) {
          decls.push(declaration.toString());
        });
        decls = decls.sort(alphaSort.asc);
        var placeholderName = uniqueId({prefix: '_'}, decls);
        if (-1 === placeholders.indexOf(placeholderName)) {
          placeholders[placeholderName] = decls.join(';');
        }
        var placeholder =
          '%' +
          placeholderName +
          '{' +
          placeholders[placeholderName] +
          '}';
        css.append(placeholder);
        atRule.replaceWith('@extend ' + placeholder);
        postcss([postCSSExtend]).process(css);
      }
    });
  }
});
