import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import Landing from './screens/Landing';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import LogoImage from './screens/LogoImage';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import AccountCreated from './screens/AccountCreated';
import Quote from './screens/policies/quote/Quote';

const Stack = createStackNavigator();

let content;

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isLoggedIn: false,
      darkTheme: false,
      accessToken: ''
    };
  }
  toggleTheme = (e) => {
    this.setState({ darkTheme: !this.state.darkTheme }, () => {
      console.log('app ', this.state.darkTheme);
    });
  };
  checkLogin = (e, f) => {
    this.setState({ isLoggedIn: true, accessToken: e });
  };
  setLogout = async (e) => {
    await AsyncStorage.clear();
    this.setState({ isLoggedIn: false });
  };
  async _loadAssetsAsync() {
    // const imageAssets = cacheImages([require('./assets/images/landing.jpg')]);
    // await Promise.all([...imageAssets]);
  }
  render() {
    const MyTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)'
      }
    };
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    if (this.state.isLoggedIn == false) {
      content = (
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid
          }}
          headerMode="float"
          animation="fade"
          screenOptions={{ headerLeft: () => <LogoImage /> }}
          initialRouteName="Welcome"
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
            initialParams={{ checkLogin: this.checkLogin }}
          />
          {/* <Stack.Screen
            name="Quote"
            component={Quote}
            options={{ headerShown: false }}
            initialParams={{ accessToken:this.state.accessToken}}
          /> */}
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountCreated"
            component={AccountCreated}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      );
    } else if (this.state.isLoggedIn == true) {
      content = (
        <Home
          setLogout={this.setLogout}
          toggleTheme={this.toggleTheme}
          darkTheme={this.state.darkTheme}
          accessToken={this.state.accessToken}
        />
      );
    }
    return (
      <NavigationContainer>
        <StatusBar hidden />
        {content}
      </NavigationContainer>
    );
  }
}
