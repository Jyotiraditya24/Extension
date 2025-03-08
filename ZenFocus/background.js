chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // tabId: The ID of the tab that was updated
    // changeInfo: Object with information about what changed
    // tab: The current state of the tab
    chrome.storage.sync.get(['allowedWebsites', 'focusMode'], (data) => {
        if (!data.focusMode) return;
        const allowedWebsites = data.allowedWebsites || [];
        const isAllowed = allowedWebsites.some(site => tab.url.includes(site));

        if (!isAllowed) {
            chrome.tabs.remove(tabId);
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Focus Mode Alert',
                message: `You can't visit ${tab.url} in Focus Mode.`
            })
        }
    })
});