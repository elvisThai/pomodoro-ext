// Handle extension icon click to open timer in new tab
chrome.action.onClicked.addListener((tab) => {
    // Check if timer tab is already open
    chrome.tabs.query({}, (tabs) => {
        const timerTab = tabs.find(t => t.url && t.url.includes('timer.html'));
        
        if (timerTab) {
            // Focus existing timer tab
            chrome.tabs.update(timerTab.id, { active: true });
            chrome.windows.update(timerTab.windowId, { focused: true });
        } else {
            // Create new timer tab
            chrome.tabs.create({
                url: chrome.runtime.getURL('timer.html'),
                active: true
            });
        }
    });
});

// Handle messages from timer tab
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showNotification') {
        showNotification(request.title, request.message);
    }
});

// Show notification when timer completes
function showNotification(title, message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: title,
        message: message,
        priority: 2
    });
}

// Handle notification clicks
chrome.notifications.onClicked.addListener((notificationId) => {
    // Focus the timer tab when notification is clicked
    chrome.tabs.query({}, (tabs) => {
        const timerTab = tabs.find(t => t.url && t.url.includes('timer.html'));
        
        if (timerTab) {
            chrome.tabs.update(timerTab.id, { active: true });
            chrome.windows.update(timerTab.windowId, { focused: true });
        } else {
            // Create new timer tab if none exists
            chrome.tabs.create({
                url: chrome.runtime.getURL('timer.html'),
                active: true
            });
        }
    });
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // Show welcome notification
        showNotification(
            'Welcome to Smiski Timer! 🎉',
            'Your cute Pomodoro timer is ready to help you stay productive!'
        );
    }
});

// Handle alarm events (for future features)
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('Alarm triggered:', alarm.name);
});

