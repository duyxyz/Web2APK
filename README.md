# Web to App Converter (Flutter)

This is a simple Flutter application that acts as a web wrapper. It automatically loads a specified website URL using an embedded `InAppWebView`.

## Features

- **Automated Builds**: Use GitHub Actions to easily build and download the APK without setting up a local development environment.
- **Customizable**: You can customize the App Name, Package Name, Website URL, and App Icon directly from the GitHub Actions workflow UI prior to building.
- **Optimized Releases**: Generates separate APKs (`arm64-v8a` and `armeabi-v7a`) for optimized installation size.

## How to Build the App (via GitHub Actions)

1. Go to the **Actions** tab in this GitHub repository.
2. Select the **Build Flutter APK** workflow on the left sidebar.
3. Click on the **Run workflow** dropdown button.
4. Fill in the required parameters:
   - **App Name**: The display name of your app.
   - **Package Name**: The unique identifier for your app (e.g., `com.yourcompany.yourapp`).
   - **Web URL**: The website URL your app will load inside the webview.
   - **Icon URL**: A direct link to download the app's logo/icon (supports standard image formats).
5. Click **Run workflow** and wait for the build to finish.
6. Once it completes, scroll down to the **Artifacts** section of the workflow run to download the generated `.apk` files for your device.

## Local Development (Optional)

If you'd like to run or modify the code locally instead:
1. Ensure you have the Flutter SDK installed (requires SDK version `^3.5.0`).
2. Clone this repository to your local machine.
3. Run `flutter pub get` in the project root to install dependencies.
4. Run `flutter run` to launch the application.
