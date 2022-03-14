# swifty-companion

This project is an introduction to develop mobile development. The goal is to create, an application in which it allow users to get infos about [42](https://www.42.fr/) students, using the 42 API.

<table>
  <tr>
    <td valign="top"><img src="/assets/screenshots/app.gif"/></td>
  </tr>
</table>

# Overview
I have made the swifty-companion using `react-native` along with `expo-dev`, It contains two views, the Home view where you should find the login search input, you type in the login of the student that you want to see their infos. If the login is correct and the user exists on the 42 API, then and you will be redirected to the second view, the Profile view where you can find the student infos (Full name, Email, Level, Projects, Skills ...)

# Get started
## Clone the repository:
```
$ git clone https://www.github.com/Ayagoumi/swifty-companion
```
## Install the dependencies:
```
$ cd swifty-companion
$ yarn
```
Before starting the project, you are going to need some configuration to be able to get 42 API token and fetch the data.
Open the `.env` file:
```
  CLIENT_ID: "YOUR_CLIENT_ID",
  CLIENT_SECRET: "YOUR_CLIENT_SECRET",
  ...
  ...

```
Change the `CLIENT_ID` and `CLIENT_SECRET` to your app id and app secret. if you need information about how you can get the app id and app secret, [Click here](#create-42-app).

## Run the developement server:
You are going to need `expo-cli` installed globally for this to work
```
$ yarn add --global expo-cli
```
then run:
```
$ yarn start
```
Then follow the expo instruction to open the app either in an android emulator or an iOS simulator, or on your physical device.
read more about `expo-cli` documentation [here](https://docs.expo.dev/workflow/expo-cli/)

# Create 42 APP
 - On your intra, go to Settings > API
 - Click on **Register a new app**
 - Fill up your app informations.

Once you create the app, go to your app page and you will find the `CLIENT_ID` and the `CLIENT_SECRET` copy them
and fill them up in the `.env`

# Built with:

* Front-end: React-native.
* Back-end: [42 API](https://api.intra.42.fr/apidoc).

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
