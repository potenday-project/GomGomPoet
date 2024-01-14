import { NavigationContainer, getPathFromState } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import Confide from "./src/Confide";
import Comfort from "./src/Comfort";
import History from "./src/History";

const Stack = createNativeStackNavigator();
const linking = {
    prefixes: ['https://gomgom-poet.co.kr'],
    config: {
        screens: {
            Confide: '',
            Comfort: '/comfort'
        }
    },
    getPathFromState: (state, config) => {
        let path = getPathFromState(state, config);
        return path.replace(/\?.+/g, '');
    }
};

export default function App() {
  let [isReady, setReady] = useState(false);

  const fetchFonts = async () => {
    await Font.loadAsync({
        HakgyoansimWoojuR: require('./assets/fonts/HakgyoansimWoojuR.ttf'),
        YeongdeokSea: require('./assets/fonts/YeongdeokSea.ttf')
    });
    setReady(true);
  }

  useEffect(fetchFonts, []);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Confide"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Confide"
          component={Confide}
          options={{ title: "곰곰시인" }}
        />
        <Stack.Screen
          name="Comfort"
          component={Comfort}
          options={{ title: "곰곰시인" }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ title: "곰곰시인" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
