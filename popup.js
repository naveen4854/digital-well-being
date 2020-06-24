// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {
  let color = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: 'document.body.style.backgroundColor = "' + color + '";' });
  });
};

let focusMode = document.getElementById('focusMode');

chrome.storage.sync.get('focusMode', function (data) {
  // focusMode.checked = data.color;
  focusMode.setAttribute('value', data.color);
});

focusMode.onclick = function (element) {
  debugger
  let focusMode = element.target.value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.storage.sync.set({ focusMode: focusMode }, function () {
      
      console.log('color is ' + focusMode);
    })
  });
};


