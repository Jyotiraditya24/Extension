chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Trigger only when the URL is loaded
    if (changeInfo.status !== 'complete') return;

    // Fetch allowed websites and Focus Mode status
    chrome.storage.sync.get(['allowedWebsites', 'focusMode'], (data) => {
        if (!data.focusMode) return;

        const allowedWebsites = data.allowedWebsites || [];
        const isAllowed = allowedWebsites.some(site => tab.url.includes(site));

        // If the website is NOT allowed, close the tab
        if (!isAllowed) {
            chrome.tabs.remove(tabId);

            // Trigger a notification after closing the tab
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'zenIcon.png',
                title: 'Focus Mode Alert',
                message: `You can't visit ${tab.url} in Focus Mode.`
            });
        }
    });
});

// Ensure default settings are saved when extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        allowedWebsites: ["https://mail.google.com", "https://www.linkedin.com"],
        focusMode: false
    });
});
