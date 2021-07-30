import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';

const Intimation = (props) => {
   
  const [relationship, setRelationship] = useState('Other');
  const [intimatingPersonId, setIntimatingPersonId] = useState('');
  const [intimatingPersonName, setIntimatingPersonName] = useState('');
  const [intimatingPersonEmail, setIntimatingPersonEmail] = useState('');
  const [intimatingPersonPhone, setIntimatingPersonPhone] = useState(0);
  const [intimatingPersonAddress, setIntimatingPersonAddress] = useState('');
  const [intimatingPersonCity, setIntimatingPersonCity] = useState('');
  const [intimatingPersonState, setIntimatingPersonState] = useState('');
  const [intimatingPersonCode, setIntimatingPersonCode] = useState(0);
    const [participants, setParticipants] = useState('');
   
  const AddIntimation = () => {
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/ClaimParticipant`,
      {
        method: 'POST',
        headers: {
          Authorization: props.route.params.Bearer,

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Roles: 'Claimee',
          Insurance_Policy_Participant__c: intimatingPersonId,
          ClaimId: props.route.params.claimId
        })
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('inv parties ', data);
        props.navigation.navigate('CertificateUpload', {
          Bearer: props.route.params.Bearer, claimId:props.route.params.claimId
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    
  };
useEffect(() => {
  fetch(
    `https://ackofinaldemo-dev-ed.my.salesforce.com/services/apexrest/InsurancePolicyParticipants?insure_policy_id=${props.route.params.selectedPolicy}`,
    {
      method: 'GET',
      headers: {
        Authorization: props.route.params.Bearer,
        'Content-Type': 'application/json'
      }
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("InsurancePolicyParticipants ",data);
      setParticipants(data);
      setIntimatingPersonId(Object.values(data)[0].Id);
      setIntimatingPersonName(Object.values(data)[0].AccName);
      setIntimatingPersonEmail(Object.values(data)[0].Email);
      setIntimatingPersonPhone(Object.values(data)[0].Phone);
      setIntimatingPersonAddress(Object.values(data)[0].BillingStreet);
      setIntimatingPersonCity(Object.values(data)[0].BillingCity);
      setIntimatingPersonState(Object.values(data)[0].BillingState);
      setIntimatingPersonCode(Object.values(data)[0].BillingPostalCode);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: '#fff' }]}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 20
        }}
        onPress={() => {
          props.navigation.navigate('termClaimDetails');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Intimation
        </Text>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="always"
        centerContent={true}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 18, paddingTop: 15 }}>
          Details of the person intimating the event
        </Text>

        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>Name</Text>
          <TextInput
            placeholder="Name of the person"
            style={styles.textInput}
            value={intimatingPersonName}
            onChangeText={(e) => setIntimatingPersonName(e)}
          />
        </View>
        <Text style={{ fontSize: 16, paddingTop: 15 }}>
          Relationship with policy holder
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableWithoutFeedback onPress={() => setRelationship('Child')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Child"
                status={relationship === 'Child' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setRelationship('Child')}
              />
              <Text
                style={
                  relationship === 'Child'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Child
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setRelationship('Sibling')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Sibling"
                status={relationship === 'Sibling' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setRelationship('Sibling')}
              />
              <Text
                style={
                  relationship === 'Sibling'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Sibling
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setRelationship('Other')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="Other"
                status={relationship === 'Other' ? 'checked' : 'unchecked'}
                color="#518EF8"
                onPress={() => setRelationship('Other')}
              />
              <Text
                style={
                  relationship === 'Other'
                    ? [styles.title, { color: '#518EF8' }]
                    : [styles.title, { color: '#000' }]
                }
              >
                Other
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>Email</Text>
          <TextInput
            placeholder="Email address"
            style={styles.textInput}
            value={intimatingPersonEmail}
            onChangeText={(e) => setIntimatingPersonEmail(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>Phone</Text>
          <TextInput
            placeholder="Phone number"
            style={styles.textInput}
            value={intimatingPersonPhone}
            onChangeText={(e) => setIntimatingPersonPhone(e)}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>Address</Text>
          <TextInput
            placeholder="Address"
            style={styles.textInput}
            value={intimatingPersonAddress}
            onChangeText={(e) => setIntimatingPersonAddress(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>City</Text>
          <TextInput
            placeholder="City"
            style={styles.textInput}
            value={intimatingPersonCity}
            onChangeText={(e) => setIntimatingPersonCity(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>State</Text>
          <TextInput
            placeholder="State"
            style={styles.textInput}
            value={intimatingPersonState}
            onChangeText={(e) => setIntimatingPersonState(e)}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>Postal Code</Text>
          <TextInput
            placeholder="Postal Code"
            style={styles.textInput}
            value={intimatingPersonCode}
            onChangeText={(e) => setIntimatingPersonCode(e)}
          />
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
            props.navigation.navigate('termClaimDetails');
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
            2<Text style={{ fontWeight: 'normal' }}>/5</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            AddIntimation();
          }}
          style={styles.footerButton}
        >
          <Text style={{ color: '#fff', padding: 20, fontSize: 20 }}>Next</Text>
          <FontAwesomeIcon icon={faArrowRight} size={18} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Intimation;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commuteView: {
    padding: 15,
    borderRadius: 5,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  gender: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,

    padding: 15,
    marginRight: 10,
    marginVertical: 10
  },

  textInput: {
    fontSize: 16,
    backgroundColor: '#f8f8f8',

    padding: 20,
    borderRadius: 5
  },
  title: {
    fontSize: 16,
    paddingRight: 10,
    paddingVertical: 10
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
