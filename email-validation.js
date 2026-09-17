// Arez Growth — Email Validation v1
// Goal: reduce fake/disposable/unreachable email submissions without requiring user verification.
// Important: no non-confirmation method can prove mailbox ownership or guarantee mailbox existence.

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com','guerrillamail.com','10minutemail.com','tempmail.com','temp-mail.org','yopmail.com'
]);

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function hasValidEmailSyntax(email) {
  // Practical syntax check; intentionally avoids pretending full RFC validation proves deliverability.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function getDomain(email) {
  return email.slice(email.lastIndexOf('@') + 1);
}

function isDisposableEmail(email) {
  return DISPOSABLE_DOMAINS.has(getDomain(email));
}

function validateEmailLocally(value) {
  const email = normalizeEmail(value);
  if (!hasValidEmailSyntax(email)) {
    return { ok: false, code: 'invalid_syntax', message: 'Please enter a valid email address.' };
  }
  if (isDisposableEmail(email)) {
    return { ok: false, code: 'disposable_email', message: 'Please enter a real, non-temporary email address.' };
  }
  return { ok: true, email };
}

if (typeof module !== 'undefined') {
  module.exports = { normalizeEmail, hasValidEmailSyntax, getDomain, isDisposableEmail, validateEmailLocally };
}
