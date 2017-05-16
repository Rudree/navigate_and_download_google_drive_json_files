#!/usr/bin/env node
import fs from "fs";
import Google from "googleapis";
import GoogleAuth from "google-auth-library";
import Promise from "bluebird";

export default class {
  constructor(clientSecretPath, credentialsPath) {
    this.clientSecretPath = clientSecretPath;
    this.credentialsPath = credentialsPath;
    this.googleDrive = null; // Set in init() method.
  }

  init() {
    return Promise.promisify(fs.readFile)(this.clientSecretPath)
    .then(JSON.parse)
    .then(clientSecret => {
      let { client_id: id, client_secret: secret, redirect_uris: redirectUrls } = clientSecret.installed;
      let googleAuth = new GoogleAuth();
      return new googleAuth.OAuth2(id, secret, redirectUrls[0]);
    })
    .then(oauthClient => {
      return Promise.promisify(fs.readFile)(this.credentialsPath)
      .then(JSON.parse)
      .then(::oauthClient.setCredentials)
      .then(() => this.googleDrive = Google.drive({ auth: oauthClient, version: "v3" }));
    });
  }

  getFirstParentId(firstParent) {
    console.log("search in parent folder");
    return Promise.promisify(this.googleDrive.files.list) ({
      q: `mimeType='application/vnd.google-apps.folder' and name = '${firstParent}' and trashed =false`,
    });
  }

  getJsonFileId(parentId) {
    return Promise.promisify(this.googleDrive.files.list) ({
      q: ` '${parentId}' in parents and mimeType='application/json' and trashed =false `,
      fields: 'nextPageToken, files(id, name)',
    });
  }

  navigateChild(file) {
    return Promise.promisify(this.googleDrive.files.list) ({
      q: ` '${file}' in parents and mimeType='application/vnd.google-apps.folder' and trashed =false `,
      fields: 'nextPageToken, files(id, name)',
    });
  }
}
