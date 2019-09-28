/*global chrome*/

class UrlMatch {
  task_gid: string;
  project_gid?: string;

  constructor(task_gid: string, project_gid?: string) {
    this.task_gid = task_gid
    this.project_gid = project_gid
  }
}


class UrlUnderstander {


  async getTaskIdIfPresent() {

    if (window.chrome && chrome.runtime && chrome.runtime.id) {

        let promise : Promise<string> = new Promise((resolve: Function, reject: Function) => {
            chrome.tabs.query(
              {
                currentWindow: true,
                active: true
              }, (foundTabs) =>
              {
                if (foundTabs[0].url !== undefined)
                {
                  let currentTabUrl : string = foundTabs[0].url;
                  let match = this.handleUrl(currentTabUrl);
                  console.log("Resolving from chrome tab query");
                  resolve(match);
                } else {
                  reject()
                }
              }
            )
          }
        );

        console.log("Returning promise from tab query");
        return promise;
    } else {
      // Just a testing url for non-chrome-extension use
      let currentTabUrl : string = "https://app.asana.com/0/157953484489631/313415232221641"
      return this.handleUrl(currentTabUrl);
    }
  }

  handleUrl(url: string) {
    console.log("Parsing url " + url);
    let regexp = new RegExp('.*\/0\/(?<project_gid>[0-9]+)\/(?<task_gid>[0-9]+)');
    let matches = url.match(regexp);
    if (!matches) {
      console.error("Could not parse URL! " + url);
    }
    let match = new UrlMatch(matches!.groups!.task_gid, matches!.groups!.project_gid)
    console.log(match);
    console.log("Resolving regex match " + match);
    return match;
  }
}

export default UrlUnderstander;
export { UrlMatch };
