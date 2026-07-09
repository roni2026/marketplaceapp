import { Capacitor } from '@capacitor/core';

/**
 * Native bootstrap — only runs inside the Capacitor (Android) shell.
 * No-ops entirely on the regular web/PWA build.
 */
export async function initNative() {
  if (!Capacitor.isNativePlatform()) return;

  const [{ StatusBar, Style }, { SplashScreen }, { App }] = await Promise.all([
    import('@capacitor/status-bar'),
    import('@capacitor/splash-screen'),
    import('@capacitor/app'),
  ]);

  try {
    await StatusBar.setOverlaysWebView({ overlay: false });
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#0284c7' });
  } catch {
    // StatusBar plugin can throw on unsupported OEM builds — safe to ignore
  }

  // Exit the app on back button when there's no more web history to go back to,
  // instead of the WebView showing a blank screen.
  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) {
      window.history.back();
    } else {
      App.exitApp();
    }
  });

  await SplashScreen.hide();
}

export async function openExternal(url: string) {
  const { Capacitor } = await import('@capacitor/core');
  if (Capacitor.isNativePlatform()) {
    const { Browser } = await import('@capacitor/browser');
    await Browser.open({ url });
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
