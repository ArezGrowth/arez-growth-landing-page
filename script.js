document.documentElement.classList.add('js');

(() => {
  const form = document.querySelector('#demo-form');
  const status = document.querySelector('#form-status');
  const submitButton = document.querySelector('#demo-submit');
  const iframe = document.querySelector('iframe[name="demo-form-iframe"]');
  const successPanel = document.querySelector('#demo-success');
  if (!form || !status || !submitButton || !iframe || !successPanel) return;

  const endpoint = form.action;
  let isSubmitting = false;
  let nativeFallbackUsed = false;
  let iframeReady = false;

  const setStatus = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
  };

  const setSubmitting = (value) => {
    isSubmitting = value;
    submitButton.disabled = value;
    submitButton.setAttribute('aria-busy', String(value));
    submitButton.textContent = value ? 'Submitting…' : 'Request a Demo ↗';
  };

  const showSuccess = () => {
    setSubmitting(false);
    form.reset();
    submitButton.hidden = true;
    submitButton.style.display = 'none';
    setStatus('success', 'Thank you. Your demo request has been received successfully.');
    successPanel.hidden = true;
    successPanel.style.display = 'none';
  };

  iframe.addEventListener('load', () => {
    iframeReady = true;
    if (nativeFallbackUsed && isSubmitting) {
      showSuccess();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('error', 'Please complete the required fields with valid information.');
      return;
    }

    if (form.elements.website.value) return;

    setSubmitting(true);
    setStatus('submitting', 'Submitting…');
    const body = new URLSearchParams(new FormData(form));
    body.delete('website');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
        body
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      showSuccess();
    } catch (error) {
      // Google Apps Script may accept the POST but block reading its response via CORS.
      // The native form fallback still submits to the same endpoint without exposing a response.
      nativeFallbackUsed = true;
      iframeReady = false;
      form.target = 'demo-form-iframe';
      form.submit();
      setStatus('submitting', 'Submitting…');
    }
  });
})();