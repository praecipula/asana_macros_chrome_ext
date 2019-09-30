/*global chrome*/


class  Environment {

  static isExtension() {
    return !!(window.chrome && chrome.runtime && chrome.runtime.id);
  }
}

export default Environment;
