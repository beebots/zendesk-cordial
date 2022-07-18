# Cordial Zendesk App
This is a simple app to manage a contacts Cordial subscription status from within Zendesk

This app was built using [ZCLI](https://developer.zendesk.com/documentation/apps/app-developer-guide/zcli/) and the [Zendesk App Scaffold](https://developer.zendesk.com/documentation/apps/getting-started/about-the-zendesk-app-scaffold/)

## Running locally

To serve the app to your Zendesk instance with `?zcli_apps=true`, run

```
yarn run watch
zcli apps:server dist
```