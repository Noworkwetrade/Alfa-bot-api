// Keep-alive heartbeat for Kiwi Browser MV3 environment
chrome.alarms.create("alfaHeartbeat", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "alfaHeartbeat") {
    console.log("[Alfa Background] Worker pulse ok.");
  }
});

// Listener for signals and UI action events
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("[Alfa Background] Received message:", request);

  if (request.action === "RESET_COMPASS") {
    // Logic to reset state
    sendResponse({ status: "RESET_DONE" });
  }

  if (request.action === "COMMIT_PHASE") {
    // Logic to advance compounding step
    sendResponse({ status: "PHASE_COMMITTED" });
  }

  return true;
});
