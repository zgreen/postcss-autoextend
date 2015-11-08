'use strict';

var fs = require('fs');
var postcss = require('postcss');
var autoextend = require('../');
var test = require('tape');

function testPath(name, isFixture) {
	const suffix = isFixture ? '.fixture' : '.expected';
	return [
		'test/fixtures/',
		name,
		suffix,
		'.css'
	].join('');
}

function fixture(name, isFixture) {
  return fs.readFileSync(testPath(name, isFixture), 'utf8').trim();
}

function compareFixtures(t, name) {
  const actualCSS = postcss(autoextend)
    .process(fixture(name, true))
    .css;
	const expectedCSS = fixture(name, false);

  return t.equal(
    normalizeSpacing(actualCSS),
    normalizeSpacing(expectedCSS),
    'processed fixture ' + name + ' should be equal to expected output'
  );
}

function normalizeSpacing(css) {
	return css.replace(/\n\s+/g, '\n\t');
}

function process(css) {
	return postcss(autoextend).process(css).css;
}

test('@autoextend works', (t) => {
	compareFixtures(t, 'basic');
	t.end();
});
