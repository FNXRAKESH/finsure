import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import FNOLsubmission from "./FNOLsubmission";
import InvolvedParties from "./claimProcess/InvolvedParties";
import VehicleIncident from "./claimProcess/VehicleIncident";
import SiteOfIncident from "./claimProcess/SiteOfIncident";
import VehicleDamages from "./claimProcess/VehicleDamages";
import VehicleDamageVideo from "./claimProcess/VehicleDamageVideo";
import DamageAssessment from "./claimProcess/DamageAssessment";
import Documents from "./claimProcess/UploadImages";
import ClaimRegistration from "./claimProcess/ClaimRegistration";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FNOLDetails from "./claimProcess/FNOLDetails";
import LossDetails from "./claimProcess/LossDetails";
import Dashboard from "./Dashboard";
import UploadImages from "./claimProcess/UploadImages";
import ServiceProviders from "./claimProcess/ServiceProviders";
import ThankYou from "./claimProcess/ThankYou";

const Stack = createStackNavigator();

function Logo(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: 10,
        
      }}
    >
      <TouchableOpacity onPress={() => props.nav.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={20} color={"#000"} />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/Fs_blue.png")}
        style={{
          width: 34,
          height: 20,
        }}
      />
    </View>
  );
}

const MainScreen = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          color: "grey",
        },
        headerStyle: {
          backgroundColor: "#fff", elevation:0
        },
        headerLeft: () => <Logo nav={props.navigation} />,

        gestureDirection: "horizontal",
        headerTitleAlign: "center",
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        headerShown:true
      }}
      headerMode="float"
      animation="fade"
      initialRouteName="Dashboard"
      
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: null,
          headerShown:false
        }}
        initialParams={{
          accessToken: props.route.params.accessToken,
        }}
       
      />
      <Stack.Screen
        name="FNOLDetails"
        component={FNOLDetails}
        options={{
          title: "FNOL Details",
        }}
      />
      <Stack.Screen
        name="LossDetails"
        component={LossDetails}
        options={{
          title: "LOSS Details",
        }}
      />
      <Stack.Screen
        name="InvolvedParties"
        component={InvolvedParties}
        options={{ title: "Involved Parties" }}
      />
      <Stack.Screen
        name="UploadImage"
        component={UploadImages}
        options={{ title: "Upload Image" }}
        initialParams={{
          accessToken: props.route.params.accessToken,
        }}
      />
      <Stack.Screen
        name="ServiceProviders"
        component={ServiceProviders}
        options={{
          title: "Service Providers",
        }}
        initialParams={{
          accessToken: props.route.params.accessToken,
        }}
      />
      <Stack.Screen
        name="VehicleIncident"
        component={VehicleIncident}
        options={{ title: "Vehicle and Incident" }}
      />
      <Stack.Screen
        name="SiteOfIncident"
        component={SiteOfIncident}
        options={{ title: "Site of Incident" }}
      />
      <Stack.Screen
        name="VehicleDamages"
        component={VehicleDamages}
        options={{ title: "Vehicle Damages" }}
      />
      <Stack.Screen
        name="VehicleDamageVideo"
        component={VehicleDamageVideo}
        options={{ title: "Vehicle Damages" }}
      />
      <Stack.Screen
        name="DamageAssessment"
        component={DamageAssessment}
        options={{ title: "Damage Assessment" }}
      />
      <Stack.Screen
        name="Documents"
        component={Documents}
        options={{ title: "My Documents" }}
      />
      <Stack.Screen
        name="ClaimRegistration"
        component={ClaimRegistration}
        options={{ title: "My Claim Registration" }}
      />
      <Stack.Screen
        name="ThankYou"
        component={ThankYou}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainScreen;
