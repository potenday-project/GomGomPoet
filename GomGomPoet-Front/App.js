import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Login';
import Confide from './src/Confide';
import Comfort from './src/Comfort';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={Login} options={{ title: '곰곰시인' }}/>
                <Stack.Screen name='Confide' component={Confide} options={{ title: '곰곰시인' }}/>
                <Stack.Screen name='Comfort' component={Comfort} options={{ title: '곰곰시인' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}