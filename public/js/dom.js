export function getElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Could not find ${selector}`);
  }

  return element;
}

export function showMessage(text) {
  const message = getElement("#message");
  message.textContent = text;
  message.hidden = false;

  setTimeout(() => {
    message.hidden = true;
  }, 2500);
}

export function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
