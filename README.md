# BazarBD — Android App

The native Android app for **BazarBD**, Bangladesh's classifieds marketplace. This repo bundles the full web app (React + TypeScript + Tailwind + shadcn/ui + Supabase — see the companion [`marketplace`](https://github.com/roni2026/marketplace) repo for the web-only version) together with a native Android project built using [Capacitor](https://capacitorjs.com/).

Capacitor runs the same web UI inside a native Android WebView shell, giving you a real installable `.apk`/`.aab` with access to native device APIs — while sharing 100% of the UI code with the web app, so both stay in sync.

## ✨ What the native shell adds on top of the web app

- Native launcher icon (adaptive icon: brand-blue background + white logo mark) and splash screen
- Native share sheet for sharing ad listings (`@capacitor/share`)
- WhatsApp / phone links open through the system browser or dialer correctly (`@capacitor/browser`)
- Native status bar styled to match the brand color (`@capacitor/status-bar`)
- Hardware back-button support: goes back through in-app navigation, then exits (`@capacitor/app`)
- Offline/online network detection (`@capacitor/network`) and local key-value storage (`@capacitor/preferences`) ready to use
- Keyboard-aware layout resizing (`@capacitor/keyboard`)

All of this is additive — `src/lib/native.ts` checks `Capacitor.isNativePlatform()` and no-ops when the exact same code runs as a normal website, so a single codebase serves the web, PWA and Android builds.

## 🧱 Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Supabase · **Capacitor 6** (Android)

## 🚀 Building the Android app

### Prerequisites

- Node.js 18+
- [Android Studio](https://developer.android.com/studio) (includes the Android SDK) or the Android SDK command-line tools
- JDK 17

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Same backend as the web app. Create a project at [supabase.com](https://supabase.com), run [`supabase/schema.sql`](./supabase/schema.sql), create the `ad-images` and `avatars` public storage buckets, then:

```bash
cp .env.example .env
# fill in VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
```

### 3. Build the web bundle and sync it into the native project

```bash
npm run build
npx cap sync android
```

Run this after every change to `src/` — Capacitor copies the freshly built `dist/` into `android/app/src/main/assets/public`.

### 4. Open in Android Studio (recommended)

```bash
npx cap open android
```

Then hit **Run** to install on an emulator or a connected device.

### 5. Or build from the command line

```bash
cd android
./gradlew assembleDebug      # unsigned debug APK -> app/build/outputs/apk/debug/
./gradlew bundleRelease      # release AAB for Play Store (needs signing config)
```

> **Note on app icons/splash:** this repo ships one high-resolution icon/splash asset set (`mipmap-xxxhdpi`, default `drawable/splash.png`); Android automatically scales these for other screen densities. For pixel-perfect assets at every density before a Play Store release, regenerate them from the source files in [`assets/`](./assets) (not committed — see below) with:
> ```bash
> npx capacitor-assets generate --android
> ```

## 📂 Project Structure

```
src/                 Shared React/TypeScript app (same UI as the web app)
capacitor.config.ts  App ID, name, splash/status-bar config
android/             Native Android (Gradle) project
  app/src/main/
    java/...          MainActivity (Capacitor BridgeActivity)
    res/              Launcher icon, splash screen, strings
    AndroidManifest.xml
supabase/schema.sql   Reference DB schema + RLS policies (shared with the web app)
```

## 🔑 App identity

- Application ID: `com.bazarbd.app`
- App name: `BazarBD`

Update both in `capacitor.config.ts` and `android/app/build.gradle` (`applicationId`) before publishing under your own developer account.

## 📄 License

See [LICENSE](./LICENSE).
