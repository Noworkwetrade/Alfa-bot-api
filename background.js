chrome.alarms.create('alfaHeartbeat', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'alfaHeartbeat') {
    console.log('[Alfa Background] Worker pulse ok.');
  }
});

async function fetchLatestBar(symbol, apiKey, apiSecret) {
  const url = `https://data.alpaca.markets/v2/stocks/${encodeURIComponent(symbol)}/bars/latest`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'APCA-API-KEY-ID': apiKey,
        'APCA-API-SECRET-KEY': apiSecret
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.bar ? {
      symbol: data.symbol,
      open: data.bar.o,
      high: data.bar.h,
      low: data.bar.l,
      close: data.bar.c,
      volume: data.bar.v,
      timestamp: data.bar.t
    } : null;
  } catch (error) {
    console.error('Error fetching latest bar:', error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[Alfa Background] Received message:', request);

  if (request.action === 'GET_LATEST_BAR') {
    chrome.storage.local.get(['alpacaApiKey', 'alpacaApiSecret'], async (result) => {
      try {
        const barData = await fetchLatestBar(request.symbol, result.alpacaApiKey, result.alpacaApiSecret);
        sendResponse({ success: true, data: barData });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    });
    return true;
  }

  if (request.action === 'RESET_COMPASS') {
    sendResponse({ status: 'RESET_DONE' });
  }

  if (request.action === 'COMMIT_PHASE') {
    sendResponse({ status: 'PHASE_COMMITTED' });
  }

  return true;
});
