import React, { useEffect, useState } from 'react';
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
  Modal
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';

var Bearer;

const termClaimDetails = (props) => {
  const [policyHolder, setPolicyHolder] = useState('');
  const [policyNumber, setPolicyNumber] = useState(
    props.route.params.policyNumber
  );
  const [selectedPolicy, setSelectedPolicy] = useState(
    props.route.params.selectedPolicy
  );
  const [reasonForClaim, setReasonForClaim] = useState('Death');
  const [Deathdate, setDateOfDeath] = useState(new Date());
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [claimId, setClaimId] = useState('');


  Bearer = props.route.params.Bearer;
  const AddDriverDetails = () => {
    props.navigation.navigate('intimation', { selectedPolicy, Bearer });
  };
  const submitCase = () => {
    setBtnDisabled(true);
    var caseId;
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/case',
      {
        method: 'POST',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Priority: 'Medium',
          Status: 'New',
          Subject: 'Initiate Claim'
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('caseid ', data.id);
        caseId = data.id;
        updateClaim(caseId);
      })
      .catch((error) => {
        console.error('Error:', error);
        setBtnDisabled(false)
         
      });
  };
  const updateClaim = (caseId) => {
    console.log('inside claim ', props.route.params.selectedPolicy);
    fetch(
      'https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/claim',
      {
        method: 'POST',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          CaseId: caseId,
          ClaimType: 'Life',
          LossDate: Deathdate,
          PolicyNumberId: props.route.params.selectedPolicy,
          ClaimReasonType: reasonForClaim,
          Name: 'ClaimName',
          AccountId: props.route.params.policyholderId
        })
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('claimId ', data);
        setShowAlert(true);
        setBtnDisabled(false);
        setClaimId(data.id);
        //  props.navigation.navigate('intimation', { selectedPolicy, Bearer });
      })

      .catch((error) => {
        console.error('Error:', error);
        setBtnDisabled(false);
      });
  };
  const getPolicyHolder = async () => {
    console.log("policyNumber ",props.route.params.policyNumber);
    const response = await fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/query/?q=SELECT+Name+FROM+Account+WHERE+Id+=+'${props.route.params.policyholderId}'`,
      {
        method: 'GET',
        headers: {
          Authorization: Bearer,
          'Content-Type': 'application/json'
        }
      }
    );
    const body = await response.json();
    // console.log('body ', body);
    setPolicyHolder(body.records[0].Name)
  };
  useEffect(() => {
    getPolicyHolder();
  },[]);
  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 20
        }}
        onPress={() => {
          props.navigation.navigate('FNOLsubmission');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Life Claim
        </Text>
      </TouchableOpacity>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1, marginHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 18, paddingTop: 15 }}>
          Please provide your Claim details
        </Text>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            Poicy Number
          </Text>
          <TextInput
            placeholder="Policy Number"
            style={styles.textInput}
            defaultValue={policyNumber}
            editable={false}
          />
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ paddingVertical: 15, fontSize: 16 }}>
            policy Holder
          </Text>
          <TextInput
            placeholder="Policy Holder"
            style={styles.textInput}
            defaultValue={policyHolder}
            editable={false}
          />
        </View>
        <Text style={{ paddingVertical: 15, fontSize: 16 }}>
          Reason for Claim
        </Text>
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => setReasonForClaim('Natural Death')}
          >
            <View
              style={
                reasonForClaim === 'Natural Death'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
            >
              <RadioButton
                value="Natural Death"
                status={
                  reasonForClaim === 'Natural Death' ? 'checked' : 'unchecked'
                }
                color="#fff"
                onPress={() => setReasonForClaim('Natural Death')}
              />
              <Text
                style={
                  reasonForClaim === 'Natural Death'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: 'grey' }]
                }
              >
                Natural Death
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => setReasonForClaim('Accident')}
          >
            <View
              style={
                reasonForClaim === 'Accident'
                  ? [styles.commuteView, { backgroundColor: '#518EF8' }]
                  : [styles.commuteView, { backgroundColor: '#f8f8f8' }]
              }
            >
              <RadioButton
                value="Accident"
                status={reasonForClaim === 'Accident' ? 'checked' : 'unchecked'}
                color="#fff"
                onPress={() => setReasonForClaim('Accident')}
              />
              <Text
                style={
                  reasonForClaim === 'Accident'
                    ? [styles.title, { color: '#fff' }]
                    : [styles.title, { color: 'grey' }]
                }
              >
                Accident
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{}}>
          <Text
            style={{
              paddingVertical: 15,
              fontSize: 16
            }}
          >
            Date of Death
          </Text>
          <DatePicker
            style={{
              width: Dimensions.get('window').width,
              backgroundColor: '#f2f2f2'
            }}
            date={Deathdate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: { borderWidth: 0 }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
              setDateOfDeath(date);
            }}
          />
        </View>
      </ScrollView>
      {showAlert ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 25,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 999,
            ...StyleSheet.absoluteFill
          }}
        >
          <View style={{ backgroundColor: '#fff', padding: 20 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 22
              }}
            >
              Your claim ID is
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: '#518EF8',
                paddingVertical: 15
              }}
            >
              {claimId}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center'
              }}
            >
              You can visit "My Claims" page to view your claims
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#1AC29A',
                padding: 20,
                margin: 20,
                borderRadius: 5
              }}
              onPress={() => {
                setShowAlert(false)
                setBtnDisabled(false)
                 props.navigation.navigate('intimation', {
                   selectedPolicy,
                   Bearer,
                   claimId
                 });
                 
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 22,
                  color: '#fff'
                }}
              >
                Got It
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('FNOLsubmission');
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
            1<Text style={{ fontWeight: 'normal' }}>/5</Text>
          </Text>
        </View>
        <TouchableOpacity
          disabled={btnDisabled}
          onPress={() => {
            submitCase();
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

export default termClaimDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  commuteView: {
    paddingHorizontal: 10,
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
