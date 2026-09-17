const assert = require('assert');
const { validateEmailLocally } = require('./email-validation');

assert.equal(validateEmailLocally('not-an-email').ok, false);
assert.equal(validateEmailLocally('person@mailinator.com').ok, false);
assert.equal(validateEmailLocally('person@example.com').ok, true);
console.log('email-validation tests PASS');
