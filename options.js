// Saves options to chrome.storage
async function saveOptions() {
    const firstOptionInput = document.getElementById('first-option-input').value;
    const secondOptionInput = document.getElementById('second-option-input').value;
    const thirdOptionInput = document.getElementById('third-option-input').value;
  
    const firstOptionInputInt = parseInt(firstOptionInput);
    const secondOptionInputInt = parseInt(secondOptionInput);
    const thirdOptionInputInt = parseInt(thirdOptionInput);

    

    const fo = await chrome.storage.sync.get(['firstOption']);
    const so = await chrome.storage.sync.get(['secondOption']);
    const to = await chrome.storage.sync.get(['thirdOption']);
    console.log(fo.firstOption,so.secondOption,to.thirdOption)

    if (fo.firstOption!=firstOptionInputInt) {
        chrome.storage.sync.set({
            firstOption:firstOptionInputInt,
        }); 
    }
    if (so.secondOption!=secondOptionInputInt) {
        chrome.storage.sync.set({
            secondOption:secondOptionInputInt,
        }); 
    }
    if (to.thirdOption!=thirdOptionInputInt) {
        chrome.storage.sync.set({
            thirdOption:thirdOptionInputInt,
        }); 
    }
    
    var ele = document.getElementsByName('btnradio');
 
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            chrome.storage.sync.set({
                notificationType: ele[i].value,
            }); 
        }
    }  
};
  
  document.getElementById('save-button').addEventListener('click', saveOptions);

  function displayIntervalsSelected(firstOption,secondOption,thirdOption) {

  document.getElementById('first-option-input').placeholder = `${firstOption} mins`;
  document.getElementById('second-option-input').placeholder = `${secondOption} mins`;
  document.getElementById('third-option-input').placeholder = `${thirdOption} mins`;

}

function displayNotificationTypeSelected(notificationType) {

    console.log(notificationType,"is notif type")
    if (notificationType == 'tab') {
        document.getElementById('btnradio1').checked = true;  
    } else if (notificationType == 'popup')  {
        document.getElementById('btnradio2').checked = true;  
    }
  }

document.addEventListener('DOMContentLoaded', () => load());

async function load() {
  const fo = await chrome.storage.sync.get(['firstOption']);
  const so = await chrome.storage.sync.get(['secondOption']);
  const to = await chrome.storage.sync.get(['thirdOption']);
  const nt = await chrome.storage.sync.get(['notificationType']);

  console.log(fo.firstOption,so.secondOption,to.thirdOption,nt.notificationType)

  displayNotificationTypeSelected(nt.notificationType)
  displayIntervalsSelected(fo.firstOption,so.secondOption,to.thirdOption);
 
}