import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ClaimList from "./ClaimList";
import ClaimDetail from "./ClaimDetails";

const Stack = createSharedElementStackNavigator();

function Logo(props) {
  return (
    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
      <TouchableOpacity onPress={() => props.nav.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={20} color={"grey"} />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/Fs_blue.png")}
        style={{
          width: 34,
          height: 20,
        }}
      />
    </View>
  );
}

const MyClaims = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'grey',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerLeft: () => <Logo nav={props.navigation} />,
        gestureEnabled: false,

        headerTitleAlign: 'center'
      }}
      headerShown={false}
      initialRouteName="ClaimList"
    >
      <Stack.Screen
        name="ClaimList"
        component={ClaimList}
        options={{
          headerShown: false,
          title: 'Claim List'
        }}
        initialParams={{
          accessToken: props.route.params.accessToken
        }}
      />
      <Stack.Screen
        name="ClaimDetail"
        component={ClaimDetail}
        options={{
          headerShown: false,
          title: 'Claim Detail',
          CardStyleInterpolators: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            };
          }
        }}
        initialParams={{
          accessToken: props.route.params.accessToken
        }}
      />
    </Stack.Navigator>
  );
};

export default MyClaims;
