# navigate_and_download_google_drive_json_files

TODO.
[Google Drive CLI Client](https://github.com/prasmussen/gdrive) wrapper to download large .json( mimetype = application/json ) file

[Obtain Google Drive credentials](https://github.com/dstil/google-drive-data-provider#obtaining-google-developer-project--oauth-credentials)
- Ensure you've added environment variables to point to the credential files in `~/.zshrc`
  - `export GOOGLE_CLIENT_SECRET_PATH={path_to_client_secret_file}`
  - `export GOOGLE_CREDENTIALS_PATH={path_to_credentials_file}`
 and run `source ~/.zshrc`

 
## Prerequisites

follow instructions on [Google Drive CLI Client](https://github.com/prasmussen/gdrive) to get gdrive tool

## Installation

```bash
$npm install
```

## Run
```bash
$npm run build && node dist "FIRST_PARENT_FOLDERNAME/SECOND_PARENT_FOLDERNAME/THIRD_PARENT_FOLDERNAME" "DOWNLOAD_PATH"
```
