'use strict';

var postcss       = require('postcss');
var postcssExtend = require('postcss-extend');
var alphaSort     = require('alpha-sort');
var stringHash    = require('string-hash');

module.exports = postcss.plugin('postcss-autoextender', function () {

  return function (css, result) {
    var placeholders = [];
    css.walkAtRules(function(atRule) {
      var placeholder;
      var placeholderName;
      var decls;
      if (atRule.name === 'autoextend') {
        decls = [];
        atRule.nodes.forEach(function(declaration) {
          decls.push(declaration.toString());
        });
        decls = decls.sort(alphaSort.asc).join(';');
        placeholderName = '_' + stringHash(decls);
        if (placeholders[placeholderName] !== decls) {
          placeholders[placeholderName] = decls;
          placeholder =
            '%' +
            placeholderName +
            '{' +
            placeholders[placeholderName] +
            '}';
          css.prepend(placeholder);
        }
        atRule.replaceWith('@extend %' + placeholderName);
        postcss([postcssExtend]).process(css);
      }
    });
  }
  
});
