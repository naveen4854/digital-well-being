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