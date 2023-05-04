var captureToggle = document.getElementById('capture-toggle');

captureToggle.addEventListener('change', function() {
  if (captureToggle.checked) {
    browser.runtime.sendMessage({action: 'enable'});
  } else {
    browser.runtime.sendMessage({action: 'disable'});
  }
});

document.getElementById('download-button').addEventListener('click', function() {
  // Retrieve the captured data from local storage
  browser.storage.local.get().then(function(result) {
    var data = JSON.stringify(result);

    // Download the data as a JSON file
    browser.downloads.download({
      url: URL.createObjectURL(new Blob([data], {type: 'application/json'})),
      filename: 'captured_data.json',
      saveAs: true
    });
  });
});
