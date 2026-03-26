document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["botToken", "chatId"], (data) => {
    if (data.botToken) document.getElementById("token").value = data.botToken;
    if (data.chatId) document.getElementById("chatId").value = data.chatId;
  });

  document.getElementById("save").addEventListener("click", () => {
    const token = document.getElementById("token").value.trim();
    const chatId = document.getElementById("chatId").value.trim();
    
    chrome.storage.sync.set({ botToken: token, chatId: chatId }, () => {
      document.getElementById("status").innerHTML = "✅ Settings saved!";
      setTimeout(() => { document.getElementById("status").innerHTML = ""; }, 2000);
    });
  });

  document.getElementById("test").addEventListener("click", () => {
    chrome.storage.sync.get(["botToken", "chatId"], (data) => {
      if (!data.botToken || !data.chatId) {
        alert("Please save your Bot Token and Chat ID first");
        return;
      }
      fetch(`https://api.telegram.org/bot${data.botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: data.chatId,
          text: "✅ Test message from your Password Saver extension!"
        })
      }).then(r => {
        if (r.ok) {
          document.getElementById("status").innerHTML = "✅ Test sent to Telegram!";
          setTimeout(() => { document.getElementById("status").innerHTML = ""; }, 3000);
        } else {
          alert("Failed to send test. Check token & chat ID.");
        }
      });
    });
  });
});