import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faHandPointRight,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { Linking } from 'react-native';

const ViewDeal = (props) => {
  const [duration, setDuration] = useState('');
  const AddInsuranceDetails = () => {
    Linking.openURL(`tel:9176837787`);
  };
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 15
        }}
        onPress={() => {
          props.navigation.navigate('InsuranceCoverage');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Confirmation
        </Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20
        }}
      >
        <Image
          source={require('../../../../assets/images/logos/bristonwest.png')}
        />
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: '#0A213E',
          borderRadius: 5,
          marginVertical: 25
        }}
      >
        <Text style={{ fontSize: 22, color: '#fff', fontWeight: 'bold' }}>
          $15/$30{' '}
          <Text style={{ fontSize: 18, fontWeight: 'normal' }}>/mo</Text>
        </Text>
        <Text style={{ fontSize: 18, color: '#fff', paddingVertical: 5 }}>
          State Minimum Protection
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          centerContent={true}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ flex: 1, fontSize: 18 }}>Policy Length</Text>
              <Text style={{ fontSize: 18 }}>6 months</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ flex: 1, fontSize: 18 }}>Down Payment</Text>
              <Text style={{ fontSize: 18 }}>$274</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ flex: 1, fontSize: 18 }}>SR-22 Requirements</Text>
              <Text style={{ fontSize: 18 }}>SR-22 Included</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <Text style={{ flex: 1, fontSize: 18 }}>Pay Monthly</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 18 }}>$248 x 5</Text>
                <Text style={{ fontSize: 16, color: 'grey' }}>
                  No obligation to buy
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text style={{ flex: 1, fontSize: 18 }}> Due today</Text>
            <Text
              style={{ fontSize: 18, color: '#518EF8', fontWeight: 'bold' }}
            >
              $248
            </Text>
          </View>

          <View
            style={{
              marginVertical: 15,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          ></View>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.addAnotherVehicle}
        onPress={() => {
          props.navigation.navigate('PolicyList');
        }}
      >
        <Text style={{ paddingLeft: 10, color: '#fff', fontSize: 20 }}>
          Reserve Now
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          AddInsuranceDetails();
        }}
        style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 18 }}>Call an Agent</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewDeal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  insuranceType: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#63AFE8',
    padding: 15,
    borderRadius: 15,
    marginRight: 10
  },
  addAnotherVehicle: {
    alignItems: 'center',

    backgroundColor: '#1AC29A',
    padding: 15,
    borderRadius: 5
  }
});
