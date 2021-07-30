import React from 'react';
import { Button, View, TouchableOpacity, Image } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import PolicyList from './PolicyList';
import PolicyDetail from './PolicyDetail';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Renew from './Renew';
import Quote from './quote/Quote';
import CarDetails from './quote/carDetails/CarDetails';
import CarUsage from './quote/carDetails/CarUsage';
import DriverDetails from './quote/driverDetails/DriverDetails';
import PreviousClaims from './quote/driverDetails/PreviousClaims';
import DriversList from './quote/driverDetails/DriversList';
import InsuranceType from './quote/insurance/InsuranceType';
import CurrentInsurance from './quote/insurance/CurrentInsurance';
import InsuranceCoverage from './quote/insurance/InsuranceCoverage';
import ViewDeal from './quote/insurance/ViewDeal';
import CustomerForm from './quote/TermInsurance/CustomerForm';
import HealthInformation from './quote/TermInsurance/HealthInformation';
import OtherMedicalConditions from './quote/TermInsurance/OtherMedicalConditions';
import UploadReport from './quote/TermInsurance/UploadReport';
import CoverageNeeded from './quote/TermInsurance/CoverageNeeded';
import QuickQuote from './quote/TermInsurance/QuickQuote';
import Confirmation from './quote/TermInsurance/Confirmation';
import StripePayment from './quote/TermInsurance/StripePayment';

const Stack = createSharedElementStackNavigator();

function Logo(props) {
  return (
    <View style={{ flexDirection: 'row', paddingLeft: 10 }}>
      <TouchableOpacity onPress={() => props.nav.openDrawer()}>
        <FontAwesomeIcon icon={faBars} size={20} color={'grey'} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/Fs_blue.png')}
        style={{
          width: 34,
          height: 20
        }}
      />
    </View>
  );
}

const MyPolicies = (props) => {
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
      initialRouteName="PolicyList"
    >
      <Stack.Screen
        name="PolicyList"
        component={PolicyList}
        options={{
          headerShown: false,
          title: 'Policy List',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Quote');
              }}
              style={{ paddingHorizontal: 10 }}
            >
              <FontAwesomeIcon icon={faPlusCircle} size={30} color="#00a3f5" />
            </TouchableOpacity>
          )
        }}
        initialParams={{
          accessToken: props.route.params.accessToken
        }}
      />
      <Stack.Screen
        name="Quote"
        component={Quote}
        options={{ headerShown: false }}
        initialParams={{
          accessToken: props.route.params.accessToken
        }}
      />

      <Stack.Screen
        name="CarUsage"
        component={CarUsage}
        options={{ headerShown: false, title: 'Car Details' }}
      />
      <Stack.Screen
        name="CarDetails"
        component={CarDetails}
        options={{ headerShown: false, title: 'Car Information' }}
      />
      <Stack.Screen
        name="DriverDetails"
        component={DriverDetails}
        options={{ headerShown: false, title: 'Driver Information' }}
      />
      <Stack.Screen
        name="PreviousClaims"
        component={PreviousClaims}
        options={{ headerShown: false, title: 'Driver Information' }}
      />
      <Stack.Screen
        name="DriversList"
        component={DriversList}
        options={{ headerShown: false, title: 'Driver Information' }}
      />
      <Stack.Screen
        name="InsuranceType"
        component={InsuranceType}
        options={{ headerShown: false, title: 'Insurance Details' }}
      />
      <Stack.Screen
        name="CurrentInsurance"
        component={CurrentInsurance}
        options={{ headerShown: false, title: 'Insurance Details' }}
      />
      <Stack.Screen
        name="InsuranceCoverage"
        component={InsuranceCoverage}
        options={{ headerShown: false, title: 'Insurance Details' }}
      />
      <Stack.Screen
        name="ViewDeal"
        component={ViewDeal}
        options={{ headerShown: false, title: 'Insurance Details' }}
      />
      <Stack.Screen
        name="PolicyDetail"
        component={PolicyDetail}
        options={{
          headerShown: false,
          title: 'Policy Detail',
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
      <Stack.Screen
        name="Renew"
        component={Renew}
        options={{
          title: 'Renew'
        }}
        initialParams={{
          accessToken: props.route.params.accessToken
        }}
      />
      <Stack.Screen
        name="CustomerForm"
        component={CustomerForm}
        options={{ headerShown: false, title: 'Customer Information' }}
      />
      <Stack.Screen
        name="HealthInformation"
        component={HealthInformation}
        options={{ headerShown: false, title: 'Health Information' }}
      />
      <Stack.Screen
        name="OtherMedicalConditions"
        component={OtherMedicalConditions}
        options={{ headerShown: false, title: 'Other Medical Conditions' }}
      />
      <Stack.Screen
        name="UploadReport"
        component={UploadReport}
        options={{ headerShown: false, title: 'Upload Report' }}
      />
      <Stack.Screen
        name="CoverageNeeded"
        component={CoverageNeeded}
        options={{ headerShown: false, title: 'Coverage Information' }}
      />
      <Stack.Screen
        name="QuickQuote"
        component={QuickQuote}
        options={{ headerShown: false, title: 'Quote Information' }}
      />
      <Stack.Screen
        name="StripePayment"
        component={StripePayment}
        options={{ headerShown: false, title: 'Payment' }}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPolicies;
