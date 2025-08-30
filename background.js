// Handle messages from popup
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
    // Focus the extension popup when notification is clicked
    chrome.action.openPopup();
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

