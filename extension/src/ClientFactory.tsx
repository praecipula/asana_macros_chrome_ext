/*global chrome*/

import Environment from "./Environment";

declare var Asana: any;

class ClientFactory {
  // Gets an authorized instance of the Asana client library `client` and authorizes it
  // if we don't have credentials.
  //


  static client() {
    let pat = null;
    if (Environment.isExtension()) {
      chrome.storage.sync.get("personal_access_token", (access_token: any) => {
        console.log("Pat is " + access_token);
        pat = access_token;
      })
    } else {
      let access_token = localStorage.getItem("personal_access_token");
      console.log("Pat is " + access_token);
      pat = access_token;
    }
    let client = Asana.Client.create()
    client.useAccessToken(pat);
    client.authorize();
    console.log(client.dispatcher.authenticator);
    client.users.me().then((user: any) => {
      console.log("Hello " + user.name);
    });
    return client;
  }

}

export default ClientFactory;
