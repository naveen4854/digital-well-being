// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        // pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

console.log('hey hey')
const filter = {
    urls: [
      '*://news.ycombinator.com/*',
    ],
  }
  
  // Extra flags for the `onBeforeRequest` event.
  //
  // Here we're specifying that we want our callback
  // function to be executed synchronously such that
  // the request remains blocked until the callback 
  // function returns (having our filtering taking 
  // effect).
  const webRequestFlags = [
    'blocking',
  ];
  
  window.chrome.webRequest.onBeforeRequest.addListener(
    page => {
      console.log('page blocked - ' + page.url);
  
      return {
        cancel: true,
      };
    },
    filter,
    webRequestFlags,
  )