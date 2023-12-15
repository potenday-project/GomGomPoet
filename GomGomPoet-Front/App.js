import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Confide from "./src/Confide";
import Comfort from "./src/Comfort";
import History from "./src/History";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
