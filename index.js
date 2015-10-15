'use strict';

var postcss       = require('postcss');
var postcssExtend = require('postcss-extend');
var alphaSort     = require('alpha-sort');
var stringHash    = require('string-hash');

module.exports = postcss.plugin('postcss-autoextender', () => {

  return (css, result) => {
    // Array to hold placeholders
    const placeholders = [];
    // Walk @autoextend rules
    css.walkAtRules( (atRule) => {
      if (atRule.name === 'autoextend') {
        let decls = [];
        // Add the nodes to an array
        atRule.nodes.forEach( (declaration) => {
          decls.push(declaration.toString());
        });
        // Sort the properties alphabetically
        decls = decls.sort(alphaSort.asc).join(';');
        // Generate a hashed placeholder name based on the properties
        let placeholderName = '_' + stringHash(decls);
        // Check to see if a matching placeholder has already been generated
        if (placeholders[placeholderName] !== decls) {
          placeholders[placeholderName] = decls;
          let placeholder =
            '%' +
            placeholderName +
            '{' +
            placeholders[placeholderName] +
            '}';
          css.prepend(placeholder);
        }
        atRule.replaceWith('@extend %' + placeholderName + ';');
      }
    });
    var processor = postcss([postcssExtend]);
    processor.process(css).then( (result) => {
      css.append(result);
    });
  }

});
