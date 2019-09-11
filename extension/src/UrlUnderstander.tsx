/*global chrome*/

class UrlUnderstander {

  async getTaskIdIfPresent() {

    if (window.chrome && chrome.runtime && chrome.runtime.id) {

        let promise :Promise<string> = new Promise((resolve: any, reject: any) => {
            chrome.tabs.query(
              {
                currentWindow: true,
                active: true
              }, (foundTabs) =>
              {
                if (foundTabs[0].url !== undefined)
                {
                  let currentTabUrl : string = foundTabs[0].url;
                  resolve(currentTabUrl);
                } else {
                  reject()
                }
              }
            )
          }
        );

        promise.then((res: string) => {
            this.handleUrl(res);
          }
        )
        promise.catch((reject) => {
            console.error("Get current url rejected!")
          }
        )
    } else {
      // Just a testing task
      let currentTabUrl : string = "https://app.asana.com/0/157953484489631/313415232221641"
      let url = this.handleUrl(currentTabUrl);
      console.log(url);
    }
  }

  handleUrl(url: string) {
    console.log("The current url is " + url);
  }
}

export default UrlUnderstander;
