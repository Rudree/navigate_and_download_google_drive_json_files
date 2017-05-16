#!/usr/bin/env node
import shell from "shelljs";
import Promise from "bluebird";

export default class {
  constructor() {
  }

  downloadFile(fileId, path) {
    return Promise.promisify(shell.exec)("gdrive download --path " + path + " " + fileId + " --force");
  }
}
