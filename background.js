
chrome.alarms.onAlarm.addListener(async(alarm) => {
    if (alarm.name === 'main-alarm') {
        const item = await chrome.storage.sync.get(['numTimesUsedToday']);
        const itemToday = await chrome.storage.sync.get(['today']);
        let newToday = new Date().toLocaleDateString();
        let currentToday = itemToday.today;
        // console.log(newToday,currentToday);
        if (newToday!=currentToday){
          //new day
          numTimesUsedToday = 1;
          currentToday = newToday;
        } else {
          numTimesUsedToday = item.numTimesUsedToday + 1;
        }
        chrome.storage.sync.set({
          'numTimesUsedToday': numTimesUsedToday,
          'today': currentToday
        });
        clearAlarm();
        // if starte here 
        const nt = await chrome.storage.sync.get(['notificationType']);
        if (nt.notificationType == 'tab') {
          chrome.tabs.create({
            url: "takerest.html"
          });
        } else {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: '../assets/shuteyebasic.png',
            title: 'Hi there! Great work so far!',
            message: "This is a gentle reminder to rest your eyes just for a while!",
            buttons: [{ title: 'Restart Shuteye' },{ title: 'Cancel Shuteye' }],
            priority: 0
          });
        }
        
    } else if (alarm.name === 'time-elapsed-alarm') {
        const item = await chrome.storage.sync.get(['minutesLeft']);
        minsLeft = item.minutesLeft - 1;
        chrome.storage.sync.set({'minutesLeft': minsLeft});
        chrome.action.setBadgeText({ text:  `${minsLeft.toString()}m`});
    }
  });

  chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
      let today = new Date().toLocaleDateString();
      chrome.storage.sync.set({
        numTimesUsedToday: 0,
        today: today,
        firstOption:3,
        secondOption:4,
        thirdOption:6,
        minutes:0,
        notificationType:'tab'
      });
    }
  });
  
  function clearAlarm() {
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.storage.sync.set({'minutesLeft': 0});
  chrome.alarms.clearAll();
}

chrome.notifications.onButtonClicked.addListener(async (notificationId,buttonIndex) => {
  console.log('button index is',buttonIndex);
  const item = await chrome.storage.sync.get(['minutes']);
  const minutes = item.minutes;
  console.log('minutes is',minutes);

  if (buttonIndex == 0) {
    chrome.action.setBadgeText({ text: `${minutes.toString()}m` });
    // Create main alarm
    chrome.alarms.create('main-alarm', {
        delayInMinutes: minutes,
      });
    // Create secondary counter alarm
    chrome.alarms.create('time-elapsed-alarm', {
      periodInMinutes: 1
    });
    chrome.storage.sync.set({ 'minutes': minutes,  'minutesLeft': minutes});
    
  } else if (buttonIndex == 1){
    clearAlarm() ;
  }
});
