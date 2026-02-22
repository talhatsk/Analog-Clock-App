/**
 * Analog Clock – React Native app entry.
 * Displays an analog clock with time zone selector and offline support.
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TimeZoneProvider } from './src/context/TimeZoneContext';
import { HomeScreen } from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <TimeZoneProvider>
        <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#f5f5f5'}
        />
        <HomeScreen />
      </TimeZoneProvider>
    </SafeAreaProvider>
  );
}

export default App;
