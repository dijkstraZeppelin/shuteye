
defaultMins = 20;

function highlightButton(elementId) {
  console.log("highlightButton is",elementId)
  document.getElementById(elementId).classList.remove("btn-outline-primary");
  document.getElementById(elementId).classList.add("btn-primary");
}

function unhiglightOtherThanButton(elementId) {
  buttonIdsList = ["first-option-button","second-option-button","third-option-button"];
  buttonIdsList.forEach(function (item, index) {
    console.log("item is",item, elementId)
    if (item!=elementId) {
      document.getElementById(item).className = "btn btn-outline-primary";
    }
  });

}

function setMins(event) {
  highlightButton(event.target.id)
  unhiglightOtherThanButton(event.target.id)
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

function displayIntervalsSelected(firstOption,secondOption,thirdOption) {

  document.getElementById('first-option-button').innerText = `${firstOption} mins`;
  document.getElementById('second-option-button').innerText = `${secondOption} mins`;
  document.getElementById('third-option-button').innerText = `${thirdOption} mins`;

  document.getElementById('first-option-button').value = firstOption;
  document.getElementById('second-option-button').value = secondOption;
  document.getElementById('third-option-button').value = thirdOption;

}

function showTimeLeft(minsLeft) {
  document.getElementById('active-desc').innerText = `Your next reminder is in ${minsLeft} minutes.`
}

document.getElementById('start-button').addEventListener('click', setAlarm);
document.getElementById('stop-button').addEventListener('click', clearAlarm);
document.getElementById('first-option-button').addEventListener('click', setMins);
document.getElementById('second-option-button').addEventListener('click', setMins);
document.getElementById('third-option-button').addEventListener('click', setMins);


document.addEventListener('DOMContentLoaded', () => load());

async function load() {
  const item = await chrome.storage.sync.get(['minutes']);
  const item2 = await chrome.storage.sync.get(['minutesLeft']);
  const fo = await chrome.storage.sync.get(['firstOption']);
  const so = await chrome.storage.sync.get(['secondOption']);
  const to = await chrome.storage.sync.get(['thirdOption']);


  if (item.minutes <= 0){
    hide("stop-button");
    hide("active-heading");
    hide("closed-eye");
    hide("active-desc");
    displayIntervalsSelected(fo.firstOption,so.secondOption,to.thirdOption);

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


document.querySelector('#settings-button').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});