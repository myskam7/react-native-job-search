import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreens';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewStack from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const RevSet = createStackNavigator({ Review: ReviewStack, Settings: SettingsScreen })
const MainStack = createBottomTabNavigator({Map: MapScreen, Deck: DeckScreen, Review: RevSet });
const AppStack = createBottomTabNavigator({ Auth: AuthScreen,  Welcome: WelcomeScreen, Main: MainStack });



const Nav = createAppContainer(AppStack);

export default Nav;
