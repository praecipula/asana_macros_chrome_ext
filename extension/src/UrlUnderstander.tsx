/*global chrome*/

class UrlUnderstander {
  getTaskIdIfPresent() {
    chrome.tabs.query(
      {currentWindow: true,
        active: true
      }, (foundTabs) =>
      {
        if (foundTabs[0].url !== undefined)
        {
          let currentTabUrl : string = foundTabs[0].url;
          console.log(currentTabUrl);
        }
      }
    )
  }
}

export default UrlUnderstander;
