console.log("[Bot Content Script] Injected and initialized.");

// Listen for direct execution requests from the popup UI
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "RUN_PAGE_DOM_SCRAPE") {
    // Example DOM reading script
    const pageTitle = document.title;
    console.log("[Content Script] Scraping Title:", pageTitle);
    
    sendResponse({ status: "COMPLETE", title: pageTitle });
  }
  return true;
});

