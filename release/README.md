# Release Notes for developer

## Android

### Build for release

Generate a release build for Android

```bash
ionic cordova build --release android

```

Generate our private key using the keytool command

```bash

keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

```

Sign the unsigned APK

```bash

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore /Users/suhaimimaidin/Documents/projects/ionic/ionic2-rapidferry/platforms/android/build/outputs/apk/release/android-release-unsigned.apk RapidFerry

```
Remove old APK

```bash
rm ~/Downloads/PStaff.apk
```

Zip align tool to optimize the APK

```bash
~/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 /Users/suhaimimaidin/Documents/projects/ionic/ionic2-rapidferry/platforms/android/build/outputs/apk/release/android-release-unsigned.apk ~/Downloads/RapidFerry.apk
```
