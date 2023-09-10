
function setAlarm(event) {
  const minutes = parseInt(event.target.value);
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
  window.close();
}

function clearAlarm() {
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.storage.sync.set({ 'minutes': 0,  'minutesLeft': 0});
  chrome.alarms.clearAll();
  window.close();
}

function showTimesUsedToday(numTimesUsedToday) {
  document.getElementById('usage-history-banner').innerText = `You have used the 20-20-20 rule ${numTimesUsedToday} times so far. Way to go!`
}

function setMinsValue(minsValue) {
  document.getElementById('restart-button').value = minsValue;
}

document.getElementById('restart-button').addEventListener('click', setAlarm);
document.getElementById('cancel-button').addEventListener('click', clearAlarm);


document.addEventListener('DOMContentLoaded', () => load());

async function load() {
  const item = await chrome.storage.sync.get(['numTimesUsedToday']);
  const itemMins = await chrome.storage.sync.get(['minutes']);
  console.log(itemMins.minutes,"is time in mins")
  showTimesUsedToday(item.numTimesUsedToday);
  setMinsValue(itemMins.minutes);
}

