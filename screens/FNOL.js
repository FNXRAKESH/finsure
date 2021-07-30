import React from 'react';
import{View, Text, TouchableOpacity,Image} from 'react-native'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import FNOLsubmission from './FNOLsubmission';
import PersonalDetails from './claimProcess/PersonalDetails';
import VehicleIncident from './claimProcess/VehicleIncident';
import SiteOfIncident from './claimProcess/SiteOfIncident';
import VehicleDamages from "./claimProcess/VehicleDamages";
import VehicleDamageVideo from "./claimProcess/VehicleDamageVideo";
import DamageAssessment from "./claimProcess/DamageAssessment";
import ClaimRegistration from './claimProcess/ClaimRegistration';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import FNOLDetails from './claimProcess/FNOLDetails';
import LossDetails from './claimProcess/LossDetails';
import InvolvedParties from './claimProcess/InvolvedParties';
import ServiceProviders from './claimProcess/ServiceProviders';
import UploadImages from './claimProcess/UploadImages';
import ThankYou from './claimProcess/ThankYou';
import termClaimDetails from './termInsuranceClaim/termClaimDetails';
import Intimation from './termInsuranceClaim/Intimation';
import CertificateUpload from './termInsuranceClaim/CertificateUpload';
import AutopsyReport from './termInsuranceClaim/AutopsyReport';
import IdProofUpload from './termInsuranceClaim/IdProofUpload';
import ClaimConfirmation from './termInsuranceClaim/ClaimConfirmation';
const Stack = createStackNavigator();

function Logo(props) {
    
  return (
    <View style={{ flexDirection: "row", paddingLeft: 10 }}>
      <TouchableOpacity onPress={() => props.nav.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={20} color={"grey"} />
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
 
const FNOL = (props) => {
    
    return (
      <Stack.Navigator
        screenOptions={{
          headerTintColor: 'grey',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'grey'
          },
          headerLeft: () => <Logo nav={props.navigation} />,
          headerShown: false,
          gestureEnabled: false,
          headerTitleAlign: 'center',
          cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid
        }}
        headerMode="float"
        animation="fade"
        initialRouteName="FNOLsubmission"
      >
        <Stack.Screen
          name="FNOLsubmission"
          component={FNOLsubmission}
          options={{
            title: 'FNOL Submission'
          }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="FNOLDetails"
          component={FNOLDetails}
          options={{
            title: 'FNOL Details'
          }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYou}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LossDetails"
          component={LossDetails}
          options={{
            title: 'LOSS Details'
          }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="InvolvedParties"
          component={InvolvedParties}
          options={{
            title: 'Involved Parties'
          }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="ServiceProviders"
          component={ServiceProviders}
          options={{
            title: 'Service Providers'
          }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="PersonalDetails"
          component={PersonalDetails}
          options={{ title: 'Personal Details' }}
        />
        <Stack.Screen
          name="VehicleIncident"
          component={VehicleIncident}
          options={{ title: 'Vehicle and Incident' }}
        />
        <Stack.Screen
          name="SiteOfIncident"
          component={SiteOfIncident}
          options={{ title: 'Site of Incident' }}
        />
        <Stack.Screen
          name="VehicleDamages"
          component={VehicleDamages}
          options={{ title: 'Vehicle Damages' }}
        />
        <Stack.Screen
          name="VehicleDamageVideo"
          component={VehicleDamageVideo}
          options={{ title: 'Vehicle Damages' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="DamageAssessment"
          component={DamageAssessment}
          options={{ title: 'Damage Assessment' }}
        />
        <Stack.Screen
          name="UploadImage"
          component={UploadImages}
          options={{ title: 'Upload Image' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="ClaimRegistration"
          component={ClaimRegistration}
          options={{ title: 'My Claim Registration' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="termClaimDetails"
          component={termClaimDetails}
          options={{ title: 'Life Claim' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="intimation"
          component={Intimation}
          options={{ title: 'Life Claim' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="CertificateUpload"
          component={CertificateUpload}
          options={{ title: 'Verification Documents' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="AutopsyReport"
          component={AutopsyReport}
          options={{ title: 'Autopsy Report' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="IdProofUpload"
          component={IdProofUpload}
          options={{ title: 'Autopsy Report' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
        <Stack.Screen
          name="ClaimConfirmation"
          component={ClaimConfirmation}
          options={{ title: 'Thank You' }}
          initialParams={{
            accessToken: props.route.params.accessToken
          }}
        />
      </Stack.Navigator>
    );
}
 
export default FNOL;