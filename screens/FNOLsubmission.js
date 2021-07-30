import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

var Bearer;

const FNOLsubmission = (props) => {
  const [policy, setPolicy] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [selectedPolicyId, setSelectedPolicyId] = useState('');
  const [policyType, setPolicyType] = useState('');
  const [policyholderId, setPolicyholderId] = useState('');
   
  const [modalVisible, setModalVisible] = useState(false);
  Bearer = 'Bearer ' + props.route.params.accessToken;

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = () => {
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+NameInsuredId,Id,Name,UniversalPolicyNumber,PolicyType,EffectiveDate,ExpirationDate,Status+FROM+InsurancePolicy',
      {
        method: 'GET',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('NameInsuredId ', data.records[0].NameInsuredId);
        setPolicy(data.records);
        setSelectedPolicy(data.records[0].Name);
        setSelectedPolicyId(data.records[0].Id);
        setPolicyholderId(data.records[0].NameInsuredId);
        setPolicyType(data.records[0].PolicyType);
         
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FAFAFA' }]}>
      <View
        style={{
          flex: 1
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 30,
            paddingHorizontal: 20
          }}
          onPress={() => {
            props.navigation.navigate('MainScreen');
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
          <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
            Claim Submission
          </Text>
        </TouchableOpacity>
        <View style={{ padding: 15 }}>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
          >
            File a Claim
          </Text>

          <View
            style={{
              paddingVertical: 20
            }}
          >
            <Text style={{ paddingVertical: 15 }}>Select Policy</Text>
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
                  {selectedPolicy}
                </Text>
              </View>
              <FontAwesomeIcon icon={faChevronDown} size={16} color={'#000'} />
            </TouchableOpacity>
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
                  <FlatList
                    keyExtractor={(item, index) => index + item.Name.toString()}
                    showsVerticalScrollIndicator={false}
                    data={policy}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={styles.item}
                          onPress={() => {
                            setSelectedPolicyId(item.Id)
                            setModalVisible(false);
                            setSelectedPolicy(item.Name);
                            setPolicyType(item.PolicyType);
                            setPolicyholderId(item.NameInsuredId);
                            
                          }}
                        >
                          <Text
                            style={
                              item.Name === selectedPolicy
                                ? [
                                    styles.title,
                                    { color: '#518EF8', fontSize: 22 }
                                  ]
                                : [
                                    styles.title,
                                    { color: '#000', fontSize: 18 }
                                  ]
                            }
                          >
                            {item.Name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (selectedPolicy !== '') {
                policyType === 'Life'
                  ? props.navigation.navigate('termClaimDetails', {
                      selectedPolicy: selectedPolicyId,
                      policyNumber: selectedPolicy,
                      policyholderId: policyholderId,
                      Bearer: Bearer
                    })
                  : props.navigation.navigate('FNOLDetails', {
                      selectedPolicy: selectedPolicyId
                    });
              } else {
                alert('select a policy');
              }
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                paddingRight: 15
              }}
            >
              Let's Start
            </Text>
            <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
          </TouchableOpacity>

          <View style={{ marginTop: 30 }}>
            {/* <Image
                resizeMode="cover"
                source={require('../assets/images/insure.png')}
                style={styles.imageHolder}
              /> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default FNOLsubmission;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageHolder: {
    height: 200,
    width: Dimensions.get('window').width
  },
  button: {
    marginVertical: 25,
    backgroundColor: '#1AC29A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    paddingVertical: 10,
    borderRadius: 25,
    overflow: 'hidden'
  },
  title: {
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#000',
    textAlign: 'center'
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
  }
});
