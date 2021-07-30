import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCar,
  faUserCircle,
  faArrowLeft,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';

const InsuranceCoverage = (props) => {
  const Premium =
    'Premium protection provides the highest liability protection if you have substantial assets to protect.';
  const [coverage, setCoverage] = useState('');
  const AddInsuranceDetails = () => {
    props.navigation.navigate('ViewDeal');
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 15
        }}
        onPress={() => {
          props.navigation.navigate('DriversList');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Choose Coverage
        </Text>
      </TouchableOpacity>

      <ScrollView
        keyboardShouldPersistTaps="always"
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 15 }}>
          <TouchableWithoutFeedback onPress={() => setCoverage('State')}>
            <View
              style={
                coverage === 'State'
                  ? [styles.coverage, { backgroundColor: '#1AC29A' }]
                  : [styles.coverage, { backgroundColor: '#fff' }]
              }
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    coverage === 'State'
                      ? [styles.value, { color: '#fff' }]
                      : [styles.value, { color: '#000' }]
                  }
                >
                  $15k / $30k
                </Text>
                <Text
                  style={
                    coverage === 'State'
                      ? [styles.title, { color: '#fff' }]
                      : [styles.title]
                  }
                >
                  State minimum protection
                </Text>
              </View>
              <RadioButton
                value="State"
                status={coverage === 'State' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setCoverage('State')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setCoverage('Standard')}>
            <View
              style={
                coverage === 'Standard'
                  ? [styles.coverage, { backgroundColor: '#1AC29A' }]
                  : [styles.coverage, { backgroundColor: '#fff' }]
              }
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    coverage === 'Standard'
                      ? [styles.value, { color: '#fff' }]
                      : [styles.value, { color: '#000' }]
                  }
                >
                  $50k / $100k
                </Text>
                <Text
                  style={
                    coverage === 'Standard'
                      ? [styles.title, { color: '#fff' }]
                      : [styles.title]
                  }
                >
                  Standard protection
                </Text>
              </View>
              <RadioButton
                value="Standard"
                status={coverage === 'Standard' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setCoverage('Standard')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setCoverage('Asset')}>
            <View
              style={
                coverage === 'Asset'
                  ? [styles.coverage, { backgroundColor: '#1AC29A' }]
                  : [styles.coverage, { backgroundColor: '#fff' }]
              }
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    coverage === 'Asset'
                      ? [styles.value, { color: '#fff' }]
                      : [styles.value, { color: '#000' }]
                  }
                >
                  $100k / $300k
                </Text>
                <Text
                  style={
                    coverage === 'Asset'
                      ? [styles.title, { color: '#fff' }]
                      : [styles.title]
                  }
                >
                  Asset protection
                </Text>
              </View>
              <RadioButton
                value="Asset"
                status={coverage === 'Asset' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setCoverage('Asset')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setCoverage('Premium')}>
            <View
              style={
                coverage === 'Premium'
                  ? [styles.coverage, { backgroundColor: '#1AC29A' }]
                  : [styles.coverage, { backgroundColor: '#fff' }]
              }
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    coverage === 'Premium'
                      ? [styles.value, { color: '#fff' }]
                      : [styles.value, { color: '#000' }]
                  }
                >
                  $250k / $500k
                </Text>
                <Text
                  style={
                    coverage === 'Premium'
                      ? [styles.title, { color: '#fff' }]
                      : [styles.title]
                  }
                >
                  Premium protection
                </Text>
              </View>
              <RadioButton
                value="Premium"
                status={coverage === 'Premium' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setCoverage('Premium')}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setCoverage('Custom')}>
            <View
              style={
                coverage === 'Custom'
                  ? [styles.coverage, { backgroundColor: '#1AC29A' }]
                  : [styles.coverage, { backgroundColor: '#fff' }]
              }
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={
                    coverage === 'Custom'
                      ? [styles.title, { color: '#fff', fontSize: 20 }]
                      : [styles.title, { color: '#000', fontSize: 20 }]
                  }
                >
                  Custom protection
                </Text>
              </View>
              <RadioButton
                value="Custom"
                status={coverage === 'Custom' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setCoverage('Custom')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ padding: 15 }}>
          {coverage === 'Premium' ? (
            <Text style={{ fontSize: 17 }}>{Premium}</Text>
          ) : null}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('DriversList');
          }}
          style={styles.footerButton}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={18} color={'#fff'} />
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Back</Text>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: 0,
            borderColor: '#fff',
            justifyContent: 'center',
            alignSelf: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            8<Text style={{ fontWeight: 'normal' }}>/10</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            AddInsuranceDetails();
          }}
          style={styles.footerButton}
        >
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Next</Text>
          <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InsuranceCoverage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
  coverage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 25,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 18,
    color: 'grey'
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
