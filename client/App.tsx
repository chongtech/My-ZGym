import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as ExpoSplashScreen from "expo-splash-screen";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

import RootStackNavigator from "@/navigation/RootStackNavigator";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";

// Keep the native splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  // Debug: Disable custom splash to isolate freeze issue
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log("App: Starting prepare...");
        // Simulate loading resources (fonts, data, etc.)
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log("App: Prepare finished simulation");
      } catch (e) {
        console.warn(e);
      } finally {
        console.log("App: Setting appIsReady to true");
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      console.log("App: appIsReady is true, hiding splash screen immediately.");
      ExpoSplashScreen.hideAsync().catch(console.warn);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NavigationContainer>
                <RootStackNavigator />
              </NavigationContainer>
              <StatusBar style="auto" />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
