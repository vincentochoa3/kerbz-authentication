# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## How to test

1. Open project and add to `.env`:

   ```bash
      ### KERBZ URL
      # EXPO_PUBLIC_BASE_URL=https://api.staging.kerbzadventures.com

      ### DummyJSON URL
      EXPO_PUBLIC_BASE_URL=https://dummyjson.com/auth
   ```

   - **Note:** Since the `/me` for Kerbz api was returning not found 404 error, I opted to use a free mock authentication API. For more info about mock API check out the docs at [https://dummyjson.com/docs/auth](https://dummyjson.com/docs/auth).


3. Run commands in terminal (also listed above)

   ```bash
   npm install
   ```

   then

   ```bash
   npx expo start
   ```

3. Must have physical device, iOS simulator, or Android emulator to test

   - **For Android/iOS device:** download Expo Go on device, start the app in your terminal, scan QR provided in the terminal. If Expo Go cannot run the app, close Expo Go, reopen and try to run app `kerbz-authentication` from Expo Go Dashboard.
   - **For Android emulator:** download Android Studio desktop app, select `Virtual Device Manager` from "More Actions" dropdown, and add a device. Select device and system image (I go with latest Pixel Pro, latest API level, and arm64-v8a ABI). Once finished adding device, press "play" button on newly added device in `Device Manager`, let simulator boot up then press `a` in running terminal.
   - **For iOS simulator:** similar steps to Android emulator but you need Xcode desktop app which is exclusive to macOS.

   
4. Once `.env` is added and project is running, application loads `/login` screen

   - Valid credentials for mock api:
     <br/>
     **Email:** `emilys` (mock API uses username to authorize instead of email)
     <br/>
     **Password:** `emilyspass`

5. After successful login, application redirects to protected `/` screen, and user information is displayed

6. Test Session Persistence

   - Once logged in, press `r` in the terminal running the project to reload application (before 1 minute session expiration) and application navigates directly to `/` screen instead of `/login`
   - If user has been logged in longer than 1 minute, (via global 401 error handler) session is cleared, user is logged out, and alerted to log in again.

7. Test lock screen

   - If no gestures are made for 30 seconds, application automatically redirects to `/lock-screen` (notice `Last Active:` attribute updates after every user gesture)
   - Similarly, if application is not in foreground for 30 seconds, `/lock-screen` shows on re-opening application

8. Test `Back to Home` button on `/lock-screen`
   - Pressing button redirects and makes call to `/me`
   - Again, if user has been logged in longer than 1 minute, (via global 401 error handler) session is cleared, user is logged out, and alerted to log in again.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
