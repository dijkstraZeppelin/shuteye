// Saves options to chrome.storage
async function saveOptions() {
    const firstOptionInput = document.getElementById('first-option-input').value;
    const secondOptionInput = document.getElementById('second-option-input').value;
    const thirdOptionInput = document.getElementById('third-option-input').value;
  
    const firstOptionInputInt = parseInt(firstOptionInput);
    const secondOptionInputInt = parseInt(secondOptionInput);
    const thirdOptionInputInt = parseInt(thirdOptionInput);

    if (
        (isNaN(firstOptionInputInt)&&firstOptionInput!="")
        || (isNaN(secondOptionInputInt)&&secondOptionInput!="")
        || (isNaN(thirdOptionInputInt)&&thirdOptionInput!="")
        ) {
            document.getElementById('error-message').classList.add("alert"); 
            document.getElementById('error-message').classList.add("alert-danger"); 
        document.getElementById('error-message').innerHTML = "Please enter valid minutes!";
        return;
    }

    if (firstOptionInputInt > 30 || firstOptionInputInt < 1 || secondOptionInputInt > 30 
        || secondOptionInputInt < 1 || thirdOptionInputInt > 30 || thirdOptionInputInt < 1) {
        document.getElementById('error-message').innerHTML = "Please enter between 1 and 30 minutes!";
        document.getElementById('error-message').classList.add("alert"); 
        document.getElementById('error-message').classList.add("alert-danger"); 
        return;
    }

    document.getElementById('error-message').innerHTML = "";
    document.getElementById('error-message').classList.remove("alert"); 
    document.getElementById('error-message').classList.remove("alert"); 
    
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
    document.getElementById('save-button').innerHTML = "Saved!";
    document.getElementById('save-button').classList.add("btn-success");
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