import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const CurrentInsurance = (props) => {
  const [Insured_Duration__c, setSelectedYear] = useState('Select');
  const [Prior_Insurance_Company__c, setSelectedCarrier] = useState('');
  const [Details, setDetails] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const AddInsuranceDetails = async () => {
    props.navigation.navigate('PreviousClaims', {
      ...props.route.params,
      Insured_Duration__c,
      Prior_Insurance_Company__c
    });
  };

  console.log('currentInsurance ', props.route.params);
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
          props.navigation.navigate('InsuranceType');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Insurance Details
        </Text>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="always"
        centerContent={true}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ padding: 15, fontSize: 25, textAlign: 'center' }}>
          Who is your current Insurance carrier ?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            paddingHorizontal: 15
          }}
        >
          <TouchableOpacity
            style={
              Prior_Insurance_Company__c === 'allstate'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('allstate');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/allstate.png')}
            />
            {Prior_Insurance_Company__c === 'allstate' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              Prior_Insurance_Company__c === 'briston west'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('briston west');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/bristonwest.png')}
            />
            {Prior_Insurance_Company__c === 'briston west' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              Prior_Insurance_Company__c === 'farmers'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('farmers');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/farmers.png')}
            />
            {Prior_Insurance_Company__c === 'farmers' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoCard}
            style={
              Prior_Insurance_Company__c === 'infinity'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('infinity');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/infinity.png')}
            />
            {Prior_Insurance_Company__c === 'infinity' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              Prior_Insurance_Company__c === 'mercury'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('mercury');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/mercury.png')}
            />
            {Prior_Insurance_Company__c === 'mercury' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              Prior_Insurance_Company__c === 'root'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('root');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/root.png')}
            />
            {Prior_Insurance_Company__c === 'root' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={
              Prior_Insurance_Company__c === 'workmens'
                ? [styles.logoCard, { borderWidth: 2 }]
                : [styles.logoCard, {}]
            }
            onPress={() => {
              setSelectedCarrier('workmens');
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 100 }}
              source={require('../../../../assets/images/logos/workmens.png')}
            />
            {Prior_Insurance_Company__c === 'workmens' ? (
              <View
                style={{
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  backgroundColor: '#518EF8',
                  borderRadius: 20,
                  padding: 8
                }}
              >
                <FontAwesomeIcon icon={faCheck} size={15} color={'#fff'} />
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
        <Text style={{ padding: 15, fontSize: 18 }}>
          How long have you been insured?
        </Text>
        <View style={{ paddingHorizontal: 15 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: '#F8F8F8',
              padding: 20,
              flexDirection: 'row',
              borderRadius: 5,
              borderColor: '#0A213E',
              borderWidth: 0.5
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: '#0A213E' }}>
                {Insured_Duration__c}
              </Text>
            </View>
            <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={
                    Insured_Duration__c === 'more than 7 yrs'
                      ? [styles.insuranceType, {}]
                      : [styles.insuranceType]
                  }
                  onPress={() => {
                    setSelectedYear('more than 7 yrs');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      Insured_Duration__c === 'more than 7 yrs'
                        ? { color: '#518EF8', fontSize: 25 }
                        : { fontSize: 20, color: '#000' }
                    }
                  >
                    more than 7 yrs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    Insured_Duration__c === '5-6 yrs'
                      ? [styles.insuranceType, {}]
                      : [styles.insuranceType]
                  }
                  onPress={() => {
                    setSelectedYear('5-6 yrs');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      Insured_Duration__c === '5-6 yrs'
                        ? { color: '#518EF8', fontSize: 25 }
                        : { fontSize: 20, color: '#000' }
                    }
                  >
                    5-6 yrs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    Insured_Duration__c === '3-4 yrs'
                      ? [styles.insuranceType, {}]
                      : [styles.insuranceType]
                  }
                  onPress={() => {
                    setSelectedYear('3-4 yrs');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      Insured_Duration__c === '3-4 yrs'
                        ? { color: '#518EF8', fontSize: 25 }
                        : { fontSize: 20, color: '#000' }
                    }
                  >
                    3-4 yrs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    Insured_Duration__c === '1-2 yrs'
                      ? [styles.insuranceType, {}]
                      : [styles.insuranceType]
                  }
                  onPress={() => {
                    setSelectedYear('1-2 yrs');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      Insured_Duration__c === '1-2 yrs'
                        ? { color: '#518EF8', fontSize: 25 }
                        : { fontSize: 20, color: '#000' }
                    }
                  >
                    1-2 yrs
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    Insured_Duration__c === '6-12 months'
                      ? [styles.insuranceType, {}]
                      : [styles.insuranceType]
                  }
                  onPress={() => {
                    setSelectedYear('6-12 months');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      Insured_Duration__c === '6-12 months'
                        ? { color: '#518EF8', fontSize: 25 }
                        : { fontSize: 20, color: '#000' }
                    }
                  >
                    6-12 months
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    Insured_Duration__c === 'less than 6 months'
                      ? [styles.insuranceType, {}]
                      : [styles.insuranceType]
                  }
                  onPress={() => {
                    setSelectedYear('less than 6 months');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={
                      Insured_Duration__c === 'less than 6 months'
                        ? { color: '#518EF8', fontSize: 25 }
                        : { fontSize: 20, color: '#000' }
                    }
                  >
                    less than 6 months
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
            props.navigation.navigate('DriverDetails');
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
            5<Text style={{ fontWeight: 'normal' }}>/10</Text>
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

export default CurrentInsurance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  insuranceType: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    margin: 10
  },
  addAnotherVehicle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#63AFE8',
    padding: 15,
    borderRadius: 15
  },
  logoCard: {
    backgroundColor: '#f2f2f2',
    height: 120,
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#518EF8',
    borderWidth: 0,
    borderRadius: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    width: Dimensions.get('window').width - 20
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
