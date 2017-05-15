"use strict";

import Promise from "bluebird";
import GoogleDriveApi from "./google-drive-api";

let googleDriveApi = new GoogleDriveApi(process.env.GOOGLE_CLIENT_SECRET_PATH, process.env.GOOGLE_CREDENTIALS_PATH);

Promise.resolve()
.then(::googleDriveApi.init)
.then(() => {
  console.log(googleDriveApi);
}).catch(error => {
  console.error(error);
  process.exit(1);
});
