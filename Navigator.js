import { createBottomTabNavigator, createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreens';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import ReviewStack from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';




const AuthStack = createBottomTabNavigator({ Auth: AuthScreen });
const RevSet = createStackNavigator({ Review: ReviewStack, Settings: SettingsScreen });
const MainStack = createBottomTabNavigator({Map: MapScreen, Deck: DeckScreen, Review: RevSet });
const WelcomeStack = createBottomTabNavigator({ Welcome: WelcomeScreen });





const Nav = createAppContainer(createSwitchNavigator(
    {
        Welcome: WelcomeStack,
        Auth: AuthStack,
        Main: MainStack,

    },
    {


    }


));

export default Nav;
