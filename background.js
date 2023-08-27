
chrome.alarms.onAlarm.addListener(async(alarm) => {
    if (alarm.name === 'main-alarm') {
        const item = await chrome.storage.sync.get(['numTimesUsed']);
        numTimesUsed = item.numTimesUsed + 1;
        chrome.storage.sync.set({'numTimesUsed': numTimesUsed});
        clearAlarm();
        chrome.tabs.create({
            url: "takerest.html"
          });
    } else if (alarm.name === 'time-elapsed-alarm') {
        const item = await chrome.storage.sync.get(['minutesLeft']);
        minsLeft = item.minutesLeft - 1;
        chrome.storage.sync.set({'minutesLeft': minsLeft});
        chrome.action.setBadgeText({ text:  `${minsLeft.toString()}m`});
    }
  });

  chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      chrome.storage.sync.set({
        numTimesUsed: 0
      });
    }
  });
  
  function clearAlarm() {
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.storage.sync.set({ 'minutes': 0,  'minutesLeft': 0});
  chrome.alarms.clearAll();
}