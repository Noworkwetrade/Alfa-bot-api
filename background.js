// Keep-alive heartbeat alarm for Manifest V3 background workers
chrome.alarms.create("botHeartbeat", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "botHeartbeat") {
    console.log("[Background Worker] Heartbeat tick - worker active.");
  }
});

// Event listener for messages sent from content script or popup UI
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("[Background] Received action:", request);

  if (request.action === "EXECUTE_BOT") {
    // Process background jobs or API queries here
    sendResponse({ status: "SUCCESS", message: "Bot task executed." });
  }

  return true; // Keep response channel open for async execution
});
