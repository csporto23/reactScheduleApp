import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import DirectScreen from './screens/DirectScreen';
import SignUpScreen from './screens/SignUpScreen';

//React Navigation Setup
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';

const MainNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Profile: { screen: DashboardScreen },
  SignUp: { screen: SignUpScreen },
  HomeScreen: { screen: HomeScreen },
  SettingsScreen: { screen: SettingsScreen },
  DirectScreen: { screen: DirectScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
