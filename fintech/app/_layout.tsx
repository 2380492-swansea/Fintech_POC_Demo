import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, router, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import * as React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import Colors from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { TokenCache } from '@clerk/clerk-expo/dist/cache'
import { ClerkProvider } from '@clerk/clerk-expo/dist/provider/ClerkProvider';

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        const item = await SecureStore.getItemAsync(key)
        if (item) {
          console.log(`${key} was used 🔐 \n`)
        } else {
          console.log('No values stored under key: ' + key)
        }
        return item
      } catch (error) {
        console.error('secure store get item error: ', error)
        await SecureStore.deleteItemAsync(key)
        return null
      }
    },
    saveToken: (key: string, token: string) => {
      return SecureStore.setItemAsync(key, token)
    },
  }
}

// SecureStore is not supported on the web
export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <Stack>
  <Stack.Screen name="index" options={{ headerShown: false }} />
  <Stack.Screen
  name="signup"
  options={{
    title: '',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerStyle: { backgroundColor: Colors.background },
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={35} color={Colors.dark} />
      </TouchableOpacity>
    ),
  }}
  />
  <Stack.Screen
  name="login"
  options={{
    title: '',
    headerBackTitle: '',
    headerShadowVisible: false,
    headerStyle: { backgroundColor: Colors.background },
    headerLeft: () => (
      <TouchableOpacity onPress={router.back}>
        <Ionicons name="arrow-back" size={34} color={Colors.dark} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <Link href ={'/help'} asChild>
      <TouchableOpacity>
        <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
      </TouchableOpacity>
      </Link>
    ),
  }}
  />
  <Stack.Screen name='help' options={{ title: 'help', presentation: 'modal' }} />
</Stack>
}

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
    <GestureHandlerRootView style={{ flex: 1 }}> 
    <StatusBar barStyle="light-content" />
    </GestureHandlerRootView>
    </ClerkProvider>
  )
};

export { RootLayoutNav };

