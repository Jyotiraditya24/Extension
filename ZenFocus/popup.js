const saveBtn = document.getElementById('saveBtn');
const toggleFocusBtn = document.getElementById('toggleFocus');
const websitesInput = document.getElementById('websites');

// save websites to storage
saveBtn.addEventListener('click',()=>{
    const websites = websitesInput.value.split('\n').map(site => site.trim());
    chrome.storage.syn.set({allowedWebsites: websites})
    alert('Websites saved');
})

// toggle focus mode
toggleFocusBtn.addEventListener('click',()=>{
    chrome.storage.sync.get('focusMode',(data)=>{
        const newFocusMode = !data.focusMode;
        chrome.storage.sync.set({focusMode: newFocusMode});
        toggleFocusBtn.textContent = newFocusMode ? 'Turn OFF Focus Mode' : 'Turn ON Focus Mode';
    })
})

// initialize the popup

chrome.storage.sync.get(['allowedWebsites','focusMode'],(data)=>{
    if(data.allowedWebsites){
        websitesInput.value = data.allowedWebsites.join('\n');
    }
    if(data.focusMode){
        toggleFocusBtn.textContent = 'Turn OFF Focus Mode';
    }
})

