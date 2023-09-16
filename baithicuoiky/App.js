import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen';
import ShopScreen from './screens/ShopScreen';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import CategoriesDishesScreen from './screens/CategoriesDishesScreen';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
      <TailwindProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Shop" component={ShopScreen} />
          <Stack.Screen name="CategoriesDishes" component={CategoriesDishesScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} 
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} 
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen name="Delivery" component={DeliveryScreen} 
            options={{ presentation: 'fullScreenModal', headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;