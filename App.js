import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useColorScheme, View, AppState } from 'react-native';
import { WebView } from 'react-native-webview';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState, useEffect, useRef } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const colorScheme = useColorScheme();
  const [key, setKey] = useState(0);

  const appState = useRef(AppState.currentState);
  const lastBackgroundTime = useRef(null);

  // Xử lý khi quay lại app (Resume) sau 1 phút
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        const now = Date.now();
        const backgroundDuration = lastBackgroundTime.current ? now - lastBackgroundTime.current : 0;

        if (backgroundDuration > 60000) {
          setKey(prev => prev + 1);
        }
      }
      if (nextAppState === 'background') {
        lastBackgroundTime.current = Date.now();
      }
      appState.current = nextAppState;
    });
    return () => subscription.remove();
  }, []);

  const themeContainerStyle = colorScheme === 'dark' ? styles.containerDark : styles.containerLight;
  const webviewBackground = colorScheme === 'dark' ? '#000000' : '#ffffff';

  return (
    <SafeAreaProvider>
      <View style={[styles.container, themeContainerStyle]}>
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left', 'bottom']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <WebView
            key={key}
            source={{ uri: 'https://www.example.com/' }}
            style={[styles.webview, { backgroundColor: webviewBackground }]}
            containerStyle={{ backgroundColor: webviewBackground }}
            userAgent="Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
            overScrollMode="never"
            bounces={false}
            allowsBackForwardNavigationGestures={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            incognito={false}
            cacheEnabled={true}
          />
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerLight: { backgroundColor: '#fff' },
  containerDark: { backgroundColor: '#000' },
  webview: { flex: 1, backgroundColor: 'transparent' },
});
