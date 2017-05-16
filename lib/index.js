"use strict";

import Promise from "bluebird";
import GoogleDriveApi from "./google-drive-api";

let googleDriveApi = new GoogleDriveApi(process.env.GOOGLE_CLIENT_SECRET_PATH, process.env.GOOGLE_CREDENTIALS_PATH);

const filePathString =  process.argv.slice(2).join(' ').split("/");

let firstParent = filePathString[0];
let secondParent = filePathString[1];
let thirdParent = filePathString[2];

Promise.resolve()
.then(::googleDriveApi.init)
.then(() => {
  googleDriveApi.getFirstParentId(firstParent)
  .then( response => {
    let firstParent_file = response.files[0];
    let participantId = "P" + getParticipantId(firstParent);
    ListFolder(firstParent_file)
    .then(file => file[0][0])
    .then(file => {
      googleDriveApi.getJsonFileId(file.id, participantId)
      .then(response => console.log("json file..", response));
    });
  })
}).catch(error => {
  console.error(error);
  process.exit(1);
});


function ListFolder(file) {
  if (filePathString[filePathString.length-1] == file.name) {
    return (file);
  }
  else {
    return googleDriveApi.navigateChild(file.id)
    .then(response => response.files)
    .map(files => files)
    .filter(file => filePathString.indexOf(file.name) > -1)
    .map(file => {
        return ListFolder(file);
      });
    }
}

function getParticipantId(firstParent) {
  return firstParent.split(" ").pop();
}
