
defaultMins = 20;

function setMins(event) {
  const minutes = parseInt(event.target.value);
  defaultMins = minutes;
}

function setAlarm() {
  const minutes = defaultMins;
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

function hide(section)
{
    document.getElementById(section).style.display = "none";
}

function showTimeLeft(minsLeft) {
  document.getElementById('active-desc').innerText = `Your next reminder is in ${minsLeft} minutes.`
}

document.getElementById('start-button').addEventListener('click', setAlarm);
document.getElementById('stop-button').addEventListener('click', clearAlarm);
document.getElementById('five-mins-button').addEventListener('click', setMins);
document.getElementById('ten-mins-button').addEventListener('click', setMins);
document.getElementById('twenty-mins-button').addEventListener('click', setMins);


document.addEventListener('DOMContentLoaded', () => load());

async function load() {
  const item = await chrome.storage.sync.get(['minutes']);
  const item2 = await chrome.storage.sync.get(['minutesLeft']);

  if (item.minutes <= 0){
    hide("stop-button");
    hide("active-heading");
    hide("closed-eye");
    hide("active-desc");

  } else if (item.minutes > 0){
    hide("start-button");
    hide("inactive-heading");
    hide("inactive-desc");
    hide("open-eye");
    hide("remind-every-label");
    hide("interval-selector-button-group");
    showTimeLeft(item2.minutesLeft);
  }
}

