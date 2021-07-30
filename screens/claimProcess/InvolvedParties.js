import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  Button,
  TouchableOpacity,
  Modal
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Checkbox } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faChevronDown,
  faMap
} from '@fortawesome/free-solid-svg-icons';
import { RadioButton } from 'react-native-paper';

var Bearer, claimId;

const DATA = [
  { id: 1, role: 'Witness' },
  { id: 2, role: 'Plaintiff' },
  { id: 3, role: 'Internal Medical Approver' },
  { id: 4, role: 'Claim Legal Expert' },
  { id: 5, role: 'Opponent Third Party' },
  { id: 6, role: 'Defendant' },
  { id: 7, role: 'Claimant' },
  { id: 8, role: 'Claim Adjuster' },
  { id: 9, role: 'Victim' },
  { id: 10, role: 'Claim Representative' },
  { id: 11, role: 'Claimee' },
  { id: 12, role: 'Claim Expert' },
  { id: 13, role: 'Claim Payer' },
  { id: 14, role: 'Loss Adjuster' },
  { id: 15, role: 'Inpatient' },
  { id: 16, role: 'Outpatient' },
  { id: 17, role: 'Loss Notification Authority' },
  { id: 18, role: 'Claim Recorder' },
  { id: 19, role: 'Claim Leader' },
  { id: 20, role: 'Claim Follower' },
  { id: 21, role: 'Claim Declarer' },
  { id: 22, role: 'Patient' }
];

const InvolvedParties = (props) => {
  const [IsInjured, setIsInjured] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [participants, setParticipants] = useState('');
  const [InsurancePolicyParticipant, setInsurancePolicyParticipant] =
    useState('');
  const [selectedId, setSelectedId] = useState([]);
  Bearer = 'Bearer ' + props.route.params.accessToken;
  claimId = props.route.params.claimId;
  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
      onPress={onPress}
      style={(style, { flexDirection: 'row', alignItems: 'center' })}
    >
      <Text style={[styles.role, style]}>{item.role}</Text>
      {selectedId.includes(item.role) ? (
        <FontAwesomeIcon icon={faCheck} size={16} color={'#518EF8'} />
      ) : null}
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    // const backgroundColor = selectedId.includes(item.role) ? '#8036ff' : '#fff';
    const fontSize = selectedId.includes(item.role) ? 19 : 18;
    const color = selectedId.includes(item.role) ? '#518EF8' : '#000';
    // const icon = selectedId.includes(item.role) ? '#518EF8' : '#000';

    return (
      <Item
        item={item}
        onPress={() => {
          if (selectedId.indexOf(item.role) === -1) {
            setSelectedId([...selectedId, item.role]);
            console.log(selectedId);
          } else {
            var value = item.role;
            setSelectedId(selectedId.filter((item) => item !== value));
          }
        }}
        style={{ color, fontSize }}
      />
    );
  };

  const SubmitInvolvedParties = () => {
     
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/data/v50.0/sobjects/ClaimParticipant`,
      {
        method: 'POST',
        headers: {
          Authorization: Bearer,

          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Roles: selectedId.toString(),
          IsInjured: IsInjured,
          Insurance_Policy_Participant__c: InsurancePolicyParticipant,
          ClaimId: claimId
        })
      }
    )
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('inv parties ', data);
        props.navigation.navigate('UploadImage', { claimId: claimId });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    fetch(
      `https://ackofinaldemo-dev-ed.my.salesforce.com/services/apexrest/Finex/InsurancePolicyParticipants?insure_policy_id=${props.route.params.selectedPolicy}`,
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
        setParticipants(data);
        setInsurancePolicyParticipant(Object.values(data)[0]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: '#FAFAFA' }]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 30,
          paddingHorizontal: 20
        }}
        onPress={() => {
          this.props.navigation.navigate('LossDetails');
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={16} color={'#000'} />
        <Text style={{ fontSize: 22, paddingLeft: 15, color: '#000' }}>
          Involved Parties
        </Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <ScrollView
            style={{ marginVertical: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ paddingVertical: 15, fontSize: 18 }}>
                Insurance Policy Participant
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
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
                    {InsurancePolicyParticipant}
                  </Text>
                </View>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size={16}
                  color={'#000'}
                />
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {Object.entries(participants) &&
                      Object.entries(participants).map(([key, value]) => {
                        return (
                          <TouchableOpacity
                            key={key}
                            onPress={() => {
                              setInsurancePolicyParticipant(value);
                              setModalVisible(!modalVisible);
                            }}
                          >
                            <Text
                              style={
                                value === InsurancePolicyParticipant
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
                              {value}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </View>
              </Modal>
            </View>
            <Text style={{ fontSize: 20 }}>
              Is the Insurance policy Participant Injured?
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity onPress={() => setIsInjured('Yes')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="Yes"
                    status={IsInjured === 'Yes' ? 'checked' : 'unchecked'}
                    color="#518EF8"
                    onPress={() => setIsInjured('Yes')}
                  />
                  <Text
                    style={
                      IsInjured === 'Yes'
                        ? [styles.title, { fontSize: 18, color: '#518EF8' }]
                        : [styles.title, { fontSize: 18, color: '#000' }]
                    }
                  >
                    Yes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsInjured('No')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="No"
                    status={IsInjured === 'No' ? 'checked' : 'unchecked'}
                    color="#518EF8"
                    onPress={() => setIsInjured('No')}
                  />
                  <Text
                    style={
                      IsInjured === 'No'
                        ? [styles.title, { fontSize: 18, color: '#518EF8' }]
                        : [styles.title, { fontSize: 18, color: '#000' }]
                    }
                  >
                    No
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={{ paddingVertical: 20, fontSize: 20 }}>
              Select Role
            </Text>
            <View style={{ backgroundColor: '#fff' }}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          width: Dimensions.get('window').width,
          backgroundColor: '#1AC29A'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('LossDetails');
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
            4<Text style={{ fontWeight: 'normal' }}>/6</Text>
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            SubmitInvolvedParties();
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

export default InvolvedParties;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {},
  title: {
    padding: 15
  },
  role: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 0.9
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: '#fff',

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
    // height: Dimensions.get('window').height,
    width: Dimensions.get('window').width - 40,
    borderRadius: 10
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});
