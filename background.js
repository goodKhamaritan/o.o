var isEnabled = false;

function toggleFunctionality() {
  isEnabled = !isEnabled;
  browser.browserAction.setIcon({
    path: isEnabled ? 'icons/icon-enabled.png' : 'icons/icon-disabled.png'
  });
}

browser.browserAction.onClicked.addListener(toggleFunctionality);

browser.runtime.onMessage.addListener(function(message) {
  if (message.action === 'enable') {
    isEnabled = true;
    browser.browserAction.setIcon({path: 'icons/icon-enabled.png'});
  } else if (message.action === 'disable') {
    isEnabled = false;
    browser.browserAction.setIcon({path: 'icons/icon-disabled.png'});
  }
});

document.addEventListener('mousedown', function(event) {
  if (!isEnabled) {
    return;
  }

  // Get the element that was clicked on
  var clickedElement = event.target;

  // Save the data to local storage
  browser.storage.local.get('clicks').then(function(result) {
    var clicks = result.clicks || [];
    clicks.push({
      type: 'mousedown',
      element: clickedElement.outerHTML
    });
    browser.storage.local.set({clicks: clicks});
  });
});

document.addEventListener('mouseup', function(event) {
  if (!isEnabled) {
    return;
  }

  // Get the element that was clicked on
  var clickedElement = event.target;

  // Save the data to local storage
  browser.storage.local.get('clicks').then(function(result) {
    var clicks = result.clicks || [];
    clicks.push({
      type: 'mouseup',
      element: clickedElement.outerHTML
    });
    browser.storage.local.set({clicks: clicks});
  });
});

document.addEventListener('keydown', function(event) {
  if (!isEnabled) {
    return;
  }

  // Get the key that was pressed
  var keyPressed = event.key;

  // Save the data to local storage
  browser.storage.local.get('keys').then(function(result) {
    var keys = result.keys || [];
    keys.push({
      type: 'keydown',
      key: keyPressed
    });
    browser.storage.local.set({keys: keys});
  });
});

document.addEventListener('keyup', function(event) {
  if (!isEnabled) {
    return;
  }

  // Get the key that was released
  var keyReleased = event.key;

  // Save the data to local storage
  browser.storage.local.get('keys').then(function(result) {
    var keys = result.keys || [];
    keys.push({
      type: 'keyup',
      key: keyReleased
    });
    browser.storage.local.set({keys: keys});
  });
});
